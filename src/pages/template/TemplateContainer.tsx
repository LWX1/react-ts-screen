import "./index.scss";
import { registerConfig as config } from "./createEditorConfig";
import { MouseMenuState, MouseState } from "./data/index";
import EditorBlock from "./component/EditorBlock";
import ProviderEditor from "src/redux/ProviderEditor";
import MaterialBlock from "./component/MaterialBlock";
import { useEffect, useMemo, useRef } from "react";
import { ComponentProps, IparamsBlock } from "./interfaceIparams";
import { useMaterialDrag } from "./methods/useMaterialDrag";
import { useFocus } from "./methods/useFocus";
import EditorMenu from "./component/EditorMenu";
import useRedux, { ReducersType, useReducersMethod } from "./methods/useRedux";

interface refIparams {
	currentComponent?: ComponentProps;
	offsetLeft?:number;
	offsetTop?:number;
}

const TemplateContainer = () => {
	const refCanvas = useRef<HTMLDivElement>(null);
	const refSaveData = useRef<refIparams>({});
	const [state, dispatch] = useRedux();
	const [reducersMethod] = useReducersMethod();
	const { blockList, xLine, yLine, mouseState, mouseMenu } = state;

	useEffect(() => {
		refSaveData.current.offsetLeft = refCanvas.current?.offsetLeft;
		refSaveData.current.offsetTop = refCanvas.current?.offsetTop;
	}, [])

	// 使用物料拖拽添加组件
	const [dragStart, dragEnd] = useMaterialDrag({
		refCanvas,
		refSaveData,
	});

	// 选中渲染组件
	const [mouseDown] = useFocus(
	
		(e: any) => {
			// 右键
			if (e.button === 2) {
				const clientHeight = document.documentElement.clientHeight;
				// 菜单方向
				const isBottom = e.pageY < clientHeight / 2 ? true : false;
				if (isBottom) {
					mouseMenu.style = {
						left: e.pageX,
						top: e.pageY,
					};
				} else {
					mouseMenu.style = {
						left: e.pageX,
						bottom: clientHeight - e.pageY,
					};
				}
				dispatch({
					mouseMenu: {
						...mouseMenu,
						state: MouseMenuState.SHOW,
					},
				});
			} else {
				dispatch({
					mouseMenu: {
						state: MouseMenuState.HIDDEN,
					},
				});
			}
		}
	);

	// 改变某个组件的数据
	const changeData = (values: IparamsBlock) => {
		const data = blockList.map((item: IparamsBlock) => {
			if (item.id === values.id) {
				return values;
			}
			return item;
		});
		dispatch({
			blockList: data,
		});
	};

	// 点击容器，清空数据
	const clearOperate = () => {
		reducersMethod(ReducersType.CLEAR_OPERATE)
	};

	// 渲染组件
	const BlockListComponent = useMemo(() => {
		return blockList.map((item: any) => (
			<EditorBlock
				changeData={changeData}
				onMouseDown={mouseDown}
				data={item}
				key={item.id}
			/>
		));
	}, [blockList]);
	return (
		<ProviderEditor.Provider value={config}>
			<div className="template-container">
				<div className="template-header">标题</div>
				<div className="template-content flex-box">
					<div className="material-relation">
						<MaterialBlock
							dragStart={dragStart}
							dragEnd={dragEnd}
						/>
					</div>
					<div className="canvas-container">
						<div
							className="canvas-box"
							style={{
								width: state.box.width,
								height: state.box.height,
							}}
							ref={refCanvas}
							onMouseDown={clearOperate}
						>
							{BlockListComponent}
							{mouseState === MouseState.DOWN && xLine && (
								<div
									className="x-help-line"
									style={{ left: xLine }}
								/>
							)}
							{mouseState === MouseState.DOWN && yLine && (
								<div
									className="y-help-line"
									style={{ top: yLine }}
								/>
							)}
							{mouseMenu.state === MouseMenuState.SHOW && (
								<EditorMenu style={mouseMenu.style} />
							)}
						</div>
					</div>
					<div className="data-relation">数据</div>
				</div>
			</div>
		</ProviderEditor.Provider>
	);
};

export default TemplateContainer;
