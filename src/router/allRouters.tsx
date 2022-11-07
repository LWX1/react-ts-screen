import { lazy } from "react";
import { prefixRoute } from "../config/config";

const allRouter = [
	{
		name: "主页",
		path: prefixRoute,
		index: true,
		element: lazy(() => import("../pages/home")),
	},
	{
		name: "布局",
		path: prefixRoute + "home",
		element: lazy(() => import("../layout")),
		children: [
		  {
			name: "主页",
			path: prefixRoute + "index",
			element:  lazy(() => import("../pages/baseMenu")),
		}]
	},
	{
		name: '全局',
		path: '*',
		element: lazy(() => import("../pages/NotFound"))
	}
];

export default allRouter;
