export interface IparamsBlock {
	top: number;
	left: number;
	zIndex: number;
	keys: number; // 物料唯一的值
	isNew: boolean; 
    id: number | string; // 组件唯一的值
    focus: boolean;
    width: number; // 物料宽高
    height: number; // 物料宽高
}

export type ComponentProps = {
    label: string;
    preview: Function;
    render: Function;
    type: string;
    keys: string | number;
}
