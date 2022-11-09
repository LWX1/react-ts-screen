import { IparamsBlock } from "../interfaceIparams";

interface Iparams {
    updateBlockList: Function;
    blockList: Array<IparamsBlock>;
    selectedBlockList: Array<IparamsBlock>;
}

export const useFocus = (props: Iparams):Array<Function> => {

    const {updateBlockList, blockList, selectedBlockList} = props;
    	// 清空选中
	const clearSelectedBlockList = () => {
		updateBlockList({
			blockList: blockList.map((item: IparamsBlock) => {
				item.focus = false;
				return item;
			}),
			selectedBlockList: [],
		});
	};
	// 选中渲染组件
	const mouseDown = (e: any, values: IparamsBlock) => {
		e.preventDefault();
		e.stopPropagation();
		const selectedList: any = [];
		// 按住shift
		if (e.shiftKey) {
            updateBlockList({
				blockList: blockList.map((item: IparamsBlock) => {
					if (item.id === values.id) {
						item.focus = !item.focus;
					}
					if (item.focus) {
						selectedList.push(item);
					}
					return item;
				}),
				selectedBlockList: selectedList,
			})
		} else {
			if (selectedBlockList.length < 2)
            updateBlockList({
                blockList: blockList.map((item: IparamsBlock) => {
                    if (item.id === values.id) {
                        item.focus = true;
                    } else {
                        item.focus = false;
                    }
                    if (item.focus) {
                        selectedList.push(item);
                    }
                    return item;
                }),
                selectedBlockList: selectedList,
            })
		}
	};

    

    return [ mouseDown, clearSelectedBlockList]
};
