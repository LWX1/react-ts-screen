import { MouseMenuState, MouseState } from "../data";

export const TemplateStore = {
	state: {
		// 容器大小
		box: {
			width: 500,
			height: 500,
		},
		// 组件
		blockList: [
			{
				top: 100,
				left: 100,
				keys: 1,
				zIndex: 1,
				id: 1,
				width: 100,
				height: 100,
                focus: false
			},
			{
				top: 300,
				left: 300,
				keys: 2,
				zIndex: 2,
				id: 2,
				width: 100,
				height: 100,
			},
			{
				top: 600,
				left: 600,
				keys: 3,
				zIndex: 3,
				id: 3,
				width: 100,
				height: 100,
			},
		],
		// 右键菜单
		rightMenuShow: false,
		// 鼠标点击的当前组件
        currentComponent: null,
        // 辅助线
        xLine: undefined,
        yLine: undefined,
        // 鼠标状态
        mouseState: MouseState.INITIAL,
		// 右键菜单
		mouseMenu: {
			state: MouseMenuState.HIDDEN,
			left: 0,
			top: 0
		}
	},

    // 选中的组件
    selectedBlockList: () => TemplateStore.state.blockList.filter(item => item.focus),
    // 没选中的组件
    noSelectedBlockList: () => TemplateStore.state.blockList.filter(item => item.focus),
    // 更新状态
    // updateTemplateState: (values) => {

    // }
};
