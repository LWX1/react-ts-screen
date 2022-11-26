import { useCallback } from "react";
import { DirectionsMap, MouseState } from "../data";
import { IparamsBlock } from "../interfaceIparams";
import useRedux, { ReducersType, useReducersMethod } from "./useRedux";

/**
 * 选中组件
 * @param props 
 * @param callback 点击后回调
 * @returns 点击事件
 */

export const useFocus = ( callback: Function): Array<Function> => {
	const [state, dispatch] = useRedux();
	const [reducersMethod] = useReducersMethod();
	// 当前鼠标的位置
	const offset = {
		x: 0,
		y: 0,
	};
	const documentMouseMove = useCallback((e: MouseEvent) => {
		// console.log(e)
		const { pageX, pageY } = e;
		let deltaX = pageX - offset.x;
		let deltaY = pageY - offset.y;
		offset.x = pageX;
		offset.y = pageY;
		
		reducersMethod(ReducersType.MOUSE_MOVE, {
			deltaX,
			deltaY
		})
		const selectedBlockList = state.blockList.filter((item) => item.focus);
		const noSelectedBlockList = state.blockList.filter((item) => !item.focus);
		// console.log(selectedBlockList.length, noSelectedBlockList.length, state.blockList)
		// 当只有一个选中物体才计算辅助线
		if (
			selectedBlockList.length === 1 &&
			noSelectedBlockList.length !== 0
		) {

			reducersMethod(ReducersType.GET_HELPLINE, {
				noSelectedBlockList,
			});
			
		} else {
			dispatch({
				blockList: [...state.blockList],
			});
		}
	}, [state]);

	const documentMouseUp = useCallback((e: Event) => {
		dispatch({
			mouseState: MouseState.INITIAL
		})
		document.removeEventListener("mousemove", documentMouseMove);
		document.removeEventListener("mouseup", documentMouseUp);
	}, [state]);
	
	// 选中渲染组件
	const mouseDown = useCallback((e: any, blockItem: IparamsBlock) => {
		
		e.preventDefault();
		e.stopPropagation();
		reducersMethod(ReducersType.MOUSE_DOWN, {
			ctrlKey: e.ctrlKey,
			blockItem
		})
		offset.x = e.pageX;
		offset.y = e.pageY;
		callback && callback(e)
		// 右键
		if(e.button === 2) {
			
			return;
		};
		document.addEventListener("mousemove", documentMouseMove);
		document.addEventListener("mouseup", documentMouseUp);
	}, [state]);

	return [mouseDown];
};
