import { ComponentProps } from "../interfaceIparams";

interface Iparams {
    addBlockData: Function; 
    refCanvas:any; // 拖拽进入的元素
    refSaveData:any; // 拖拽组件
}
/**
 * 物料拖拽入元素容器中
 * @param props 
 * @returns 
 */

export const useMaterialDrag = (props: Iparams) => {

    const {addBlockData, refCanvas, refSaveData} = props;
    // 鼠标进去
	const dragenter = (e: any) => {
		// console.log(e);
		// e.dataTransfer.dropEffect = 'move';
	};

	// 鼠标离开
	const dragleave = (e: any) => {
		// console.log(e);
		// e.dataTransfer.dropEffect = 'none';
	};
	// 阻止默认事件，不然无法到drop方法
	const dragover = (e: any) => {
		e.preventDefault();
		// e.stopPropagation();
	};
	const drop = (e: any) => {
		addBlockData({
            "top": e.offsetY,
            "left": e.offsetX,
            "keys": refSaveData.current.currentComponent.keys,
            "zIndex": 1,
            "id": new Date().valueOf(),
            isNew: true
        })
	};

	const dragStart = (e: any, component: ComponentProps) => {
		refSaveData.current.currentComponent = component;
		refCanvas.current.addEventListener("dragenter", dragenter);
		refCanvas.current.addEventListener("dragleave", dragleave);
		refCanvas.current.addEventListener("dragover", dragover);
		refCanvas.current.addEventListener("drop", drop);
	};

	const dragEnd = (e: any) => {
		refCanvas.current.removeEventListener("dragenter", dragenter);
		refCanvas.current.removeEventListener("dragleave", dragleave);
		refCanvas.current.removeEventListener("dragover", dragover);
		refCanvas.current.removeEventListener("drop", drop);
	};

    return [dragStart, dragEnd]
}