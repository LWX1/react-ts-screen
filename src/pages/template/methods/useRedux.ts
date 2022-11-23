import { useSelector, useDispatch } from "react-redux";
import { updateState, addBlockList, mouseDown, mouseMove, clearOperate, getHelpLine } from "src/redux/editorStore/reducers";
import { EditorStoreType } from "../interfaceIparams";

const useRedux = ():[EditorStoreType, Function] => {
	const state:EditorStoreType = useSelector((state: { editor: any }) => state.editor);
	const dispatch= useDispatch();

	const useState = (values: any) => {
		dispatch(updateState(values));
	};

	return [state, useState];
};

export default useRedux;

export enum ReducersType {
	ADD_BLOCKLIST = 1,
	MOUSE_DOWN=2,
	MOUSE_MOVE=3,
	CLEAR_OPERATE=4,
	GET_HELPLINE=5,
}

const ReducersMethod = {
	[ReducersType.ADD_BLOCKLIST]: addBlockList,
	[ReducersType.MOUSE_DOWN]: mouseDown,
	[ReducersType.MOUSE_MOVE]: mouseMove,
	[ReducersType.CLEAR_OPERATE]: clearOperate,
	[ReducersType.GET_HELPLINE]: getHelpLine,
};

// 使用方法
export const useReducersMethod = () => {
	const state = useSelector((state: { editor: any }) => state.editor);
	const dispatch = useDispatch();

	const useState = (type: ReducersType, values: any) => {
		if(ReducersMethod[type]) {
			dispatch(ReducersMethod[type](values))
		}
		
	}
	
	return [useState, state];
};
