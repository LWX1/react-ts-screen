import { IparamsBlock } from "../interfaceIparams";

export const Data = {
	box: {
		width: 500,
		height: 500,
	},
	blockList: [
		{
		    "top": 100,
		    "left": 100,
		    "keys": 1,
		    "zIndex": 1,
		    "id": 1,
			width: 100,
			height: 100
		},
		{
		    "top": 300,
		    "left": 300,
		    "keys": 2,
		    "zIndex": 2,
		    "id": 2,
			width: 100,
			height: 100
		},
		{
		    "top": 600,
		    "left": 600,
		    "keys": 3,
		    "zIndex": 3,
		    "id": 3,
			width: 100,
			height: 100
		}
	],
};

// 辅助线计算规则
export const DirectionsMap = {
	y: [
		{
			name: "顶对顶",
			calc: (compare: IparamsBlock) => ({
				lineTop: compare.top,
				triggerTop: compare.top,
			}),
		},
		{
			name: "底对顶",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineTop: compare.top,
				triggerTop: compare.top - target.height,
			}),
		},
		{
			name: "中对中",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineTop: compare.top + compare.height / 2,
				triggerTop:
					compare.top + compare.height / 2 - target.height / 2,
			}),
		},
		{
			name: "顶对底",
			calc: (compare: IparamsBlock) => ({
				lineTop: compare.top + compare.height,
				triggerTop: compare.top + compare.height,
			}),
		},
		{
			name: "底对底",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineTop: compare.top + compare.height,
				triggerTop: compare.top + compare.height - target.height,
			}),
		},
	],
	x: [
		{
			name: "左对左",
			calc: (compare: IparamsBlock) => ({
				lineLeft: compare.left,
				triggerLeft: compare.left,
			}),
		},
		{
			name: "左对右",
			calc: (compare: IparamsBlock) => ({
				lineLeft: compare.left + compare.width,
				triggerLeft: compare.left + compare.width,
			}),
		},
		{
			name: "中对中",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineLeft: compare.left + compare.width / 2,
				triggerLeft:
					compare.left + compare.width / 2 - target.width / 2,
			}),
		},
		{
			name: "右对右",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineLeft: compare.left + compare.width,
				triggerLeft: compare.left + compare.width - target.width,
			}),
		},
		{
			name: "右对左",
			calc: (compare: IparamsBlock, target: IparamsBlock) => ({
				lineLeft: compare.left,
				triggerLeft: compare.left - target.width,
			}),
		},
	],
};

// 鼠标状态
export enum MouseState {
	// 初始
	INITIAL = 0,
	// 按下
	DOWN = 1,
}

// 鼠标右键菜单
export enum MouseMenuState {
	// 展示
	SHOW = 1,
	// 隐藏
	HIDDEN = 0,
}

// 右键菜单内容
export const MouseMenuList = [
	{
		name: "复制",
	},
	{
		name: "粘贴",
	},
	{
		name: "置顶",
	},
	{
		name: "置地",
	},
	{
		name: "上移",
	},
	{
		name: "下移",
	},
	{
		name: "隐藏",
	},
	{
		name: "删除",
	},
];
