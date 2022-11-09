import { IparamsBlock } from "../interfaceIparams";

export const Data = {
	box: {
		width: 500,
		height: 500,
	},
	blockList: [
		// {
		//     "top": 100,
		//     "left": 100,
		//     "keys": 1,
		//     "zIndex": 1,
		//     "id": 1
		// },
		// {
		//     "top": 300,
		//     "left": 300,
		//     "keys": 2,
		//     "zIndex": 2,
		//     "id": 2
		// },
		// {
		//     "top": 600,
		//     "left": 600,
		//     "keys": 3,
		//     "zIndex": 3,
		//     "id": 3
		// }
	],
};

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
export enum MouseState  {
	// 初始
	INITIAL=0,
	// 按下
	DOWN=1,
}