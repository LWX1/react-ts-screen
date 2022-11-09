import "./index.scss";
import { registerConfig as config } from "./createEditorConfig";
import {Data as data, MouseState} from "./data/index";
import EditorBlock from "./component/EditorBlock";
import ProviderEditor from "src/redux/ProviderEditor";
import MaterialBlock from "./component/MaterialBlock";
import { useEffect, useMemo, useRef } from "react";
import useReducer from "src/hooks/useReducer";
import { ComponentProps, IparamsBlock } from "./interfaceIparams";
import { useMaterialDrag } from "./methods/useMaterialDrag";
import { useFocus } from "./methods/useFocus";

interface refIparams {
	currentComponent?: ComponentProps;
}

const Template = () => {
	const refCanvas = useRef<HTMLDivElement>(null);

	const refSaveData = useRef<refIparams>({});

	const [state, dispatch] = useReducer({
		// 渲染的组件
		blockList: [],
		xLine: undefined,
		yLine: undefined,
		// 鼠标状态
		mouseState: MouseState.INITIAL,
	});
	const { blockList, xLine, yLine, mouseState } = state;
	useEffect(() => {
		dispatch({
			blockList: data.blockList,
		});
	}, []);

	// 添加拖拽的元素
	const addBlockData = (values: ComponentProps) => {
		dispatch({
			blockList: [...blockList, values],
		});
	};

	// 使用物料拖拽添加组件
	const [dragStart, dragEnd] = useMaterialDrag({
		addBlockData,
		refCanvas,
		refSaveData,
	});

	// 更新选中的渲染组件
	const updateStateData = (values: any) => {
		dispatch(values)
	}

	// 选中渲染组件
	const [mouseDown, clearSelectedBlockList ] = useFocus({
		updateStateData, 
		blockList, 
	});


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

	
	// 渲染组件
	const BlockList = useMemo(() => {
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
								width: data.box.width,
								height: data.box.height,
							}}
							ref={refCanvas}
							onMouseDown={() => clearSelectedBlockList()}
						>
							{BlockList}
							{
								mouseState === MouseState.DOWN && xLine && <div className="x-help-line" style={{left: xLine}}/>
							}
							{
								mouseState === MouseState.DOWN &&yLine && <div className="y-help-line" style={{top: yLine}}/>
							}
						</div>
					</div>
					<div className="data-relation">数据</div>
				</div>
			</div>
		</ProviderEditor.Provider>
	);
};

export default Template;
