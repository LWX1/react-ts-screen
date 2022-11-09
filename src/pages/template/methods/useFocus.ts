import { DirectionsMap, MouseState } from "../data";
import { IparamsBlock } from "../interfaceIparams";

interface Iparams {
	updateStateData: Function;
	blockList: Array<IparamsBlock>;
}

interface IparamsLine {
	currentComponent: IparamsBlock;
	noSelectedBlockList: Array<IparamsBlock>;
	updateStateData: Function;
}

interface IparamsLineItemY {
	lineTop: number;
	triggerTop: number;
}

interface IparamsLineItemX {
	lineLeft: number;
	triggerLeft: number;
}

// 偏移量
const Threshold = 5;

// 获取辅助线
const getHelpLine = (props: IparamsLine) => {
	const { currentComponent, noSelectedBlockList } = props;

	const lines: {
		x: Array<IparamsLineItemX>;
		y: Array<IparamsLineItemY>;
	} = {
		x: [],
		y: [],
	};
	// 计算参考物和当前元素符合辅助线的x,y值
	noSelectedBlockList.forEach((item) => {
		DirectionsMap.y.forEach((yItem) => {
			lines.y.push(yItem.calc(item, currentComponent));
		});
		DirectionsMap.x.forEach((xItem) => {
			lines.x.push(xItem.calc(item, currentComponent));
		});
	});

	let yLine: number | undefined;
	let xLine: number | undefined;
	let { left, top } = currentComponent;

	// false 为不满足辅助线，则不更新数据
	let isUpdate = false;
	for (let i = 0; i < lines.y.length; i++) {
		const { triggerTop, lineTop } = lines.y[i];
		// 判断，存在阙值
		if (Math.abs(top - triggerTop) < Threshold) {
			// 满足竖辅助线出现条件 为xLine赋值
			yLine = lineTop;
			// 实现吸附效果
			top = triggerTop;
			isUpdate = true;
			break;
		}
	}
	for (let j = 0; j < lines.x.length; j++) {
		const { triggerLeft, lineLeft } = lines.x[j];
		if (Math.abs(left - triggerLeft) < Threshold) {
			// 满足竖辅助线出现条件 为xLine赋值
			xLine = lineLeft;
			// 实现吸附效果
			left = triggerLeft;
			isUpdate = true;
			break;
		}
	}
	// console.log(xLine, yLine, x, y);
	return {
		xLine,
		yLine,
		left,
		top,
		isUpdate,
	};
};

// 当前组件
let currentComponent: IparamsBlock;

// 选中的组件列表
let selectedBlockList: Array<IparamsBlock> = [];
// 未选中的组件列表
let noSelectedBlockList: Array<IparamsBlock> = [];

// 更新选中和未选中的组件
const updateComponentList = (blockList: Array<IparamsBlock>) => {
	selectedBlockList = blockList.filter((item) => item.focus);
	noSelectedBlockList = blockList.filter((item) => !item.focus);
};

export const useFocus = (props: Iparams): Array<Function> => {
	const { updateStateData, blockList } = props;

	// 当前鼠标的位置
	const offset = {
		x: 0,
		y: 0,
	};
	const documentMouseMove = (e: MouseEvent) => {
		// console.log(e)
		const { pageX, pageY } = e;
		let deltaX = pageX - offset.x;
		let deltaY = pageY - offset.y;
		offset.x = pageX;
		offset.y = pageY;

		blockList.forEach((item: IparamsBlock) => {
			if (item.focus) {
				item.left += deltaX;
				item.top += deltaY;
				if (selectedBlockList.length === 1) {
					currentComponent = item;
				}
			}
		});
		// 当只有一个选中物体才计算辅助线
		if (
			selectedBlockList.length === 1 &&
			noSelectedBlockList.length !== 0
		) {
			const { isUpdate, left, xLine, top, yLine } = getHelpLine({
				currentComponent,
				noSelectedBlockList,
				updateStateData,
			});
			if (isUpdate) {
				updateStateData({
					blockList: blockList.map((item) => {
						if (currentComponent.id === item.id) {
							return {
								...item,
								left,
								top,
							};
						}
						return item;
					}),
					xLine,
					yLine,
				});
			} else {
				updateStateData({
					xLine,
					yLine,
					blockList: [...blockList],
				});
			}
		} else {
			updateStateData({
				blockList: [...blockList],
			});
		}
	};

	const documentMouseUp = (e: Event) => {
		updateStateData({
			mouseState: MouseState.INITIAL
		})
		document.removeEventListener("mousemove", documentMouseMove);
		document.removeEventListener("mouseup", documentMouseUp);
	};
	// 清空选中
	const clearSelectedBlockList = () => {
		updateStateData({
			blockList: blockList.map((item: IparamsBlock) => {
				item.focus = false;
				return item;
			}),
		});
	};
	// 选中渲染组件
	const mouseDown = (e: any, values: IparamsBlock) => {
		e.preventDefault();
		e.stopPropagation();
		const selectedList: Array<IparamsBlock> = [];
		const noSelectedList: Array<IparamsBlock> = [];
		// 按住shift
		if (e.shiftKey) {
			const arr = blockList.map((item: IparamsBlock) => {
				if (item.id === values.id) {
					item.focus = !item.focus;
				}
				if (item.focus) {
					selectedList.push(item);
				} else {
					noSelectedList.push(item);
				}
				return item;
			});
			updateStateData({
				blockList: arr,
				mouseState: MouseState.DOWN
			});
			updateComponentList(arr);
		} else {
			// 判断选中多个不更新
			if (selectedBlockList.length < 2) {
				const arr = blockList.map((item: IparamsBlock) => {
					if (item.id === values.id) {
						item.focus = true;
					} else {
						item.focus = false;
					}
					if (item.focus) {
						selectedList.push(item);
					} else {
						noSelectedList.push(item);
					}
					return item;
				});
				updateStateData({
					blockList: arr,
					mouseState: MouseState.DOWN
				});
				updateComponentList(arr);
			}
		}
		// console.log(e)
		offset.x = e.pageX;
		offset.y = e.pageY;
		document.addEventListener("mousemove", documentMouseMove);
		document.addEventListener("mouseup", documentMouseUp);
	};

	return [mouseDown, clearSelectedBlockList];
};
