// 组件
export type IparamsBlock  = {
	top: number;
	left: number;
	zIndex: number;
	keys: number; // 物料唯一的值
	isNew?: boolean; 
    id: number | string; // 组件唯一的值
    focus?: boolean;
    width: number; // 物料宽高
    height: number; // 物料宽高
}

// 物料组件
export type ComponentProps = {
    label: string;
    preview: Function;
    render: Function;
    type: string;
    keys: string | number;
}

// 容器
export type EditorContainer = {
    height: number;
    width: number;
};

export type MousePosition = {
    left: number;
    top?: number;
    bottom?: number;
}

// 鼠标菜单
export type MouseMenu = {
    state: number;
    style: MousePosition;
}

// Store 类型
export type EditorStoreType = {
    box: EditorContainer;
    blockList: Array<IparamsBlock>;
    rightMenuShow: boolean;
    currentComponent: IparamsBlock;
    xLine: number | undefined;
    yLine: number | undefined;
    mouseState: number;
    mouseMenu: MouseMenu;
 }

// 辅助线
export type IparamsLine = {
	currentComponent: IparamsBlock;
	noSelectedBlockList: Array<IparamsBlock>;
}

export type IparamsLineItemY = {
	lineTop: number;
	triggerTop: number;
}

export type IparamsLineItemX = {
	lineLeft: number;
	triggerLeft: number;
}


