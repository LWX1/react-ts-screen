import "./index.scss";
import { registerConfig as config } from "./createEditorConfig";
import data from "./data/index.json";
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
		// 选中的组件
		selectedBlockList: [],
	});
	const { blockList, selectedBlockList } = state;
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

	// 使用物料拖拽
	const [dragStart, dragEnd] = useMaterialDrag({
		addBlockData,
		refCanvas,
		refSaveData,
	});

	// 更新选中的渲染组件
	const updateBlockList = (values: any) => {
		dispatch(values)
	}

	// 选中渲染组件
	const [mouseDown, clearSelectedBlockList ] = useFocus({
		updateBlockList, 
		blockList, 
		selectedBlockList
	});


	// 改变某个block的数据
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
						</div>
					</div>
					<div className="data-relation">数据</div>
				</div>
			</div>
		</ProviderEditor.Provider>
	);
};

export default Template;
