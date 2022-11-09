import { lazy } from "react";
import { prefixRoute } from "src/config/config";

const allRouter = [
	{
		name: "主页",
		path: prefixRoute,
		index: true,
		element: lazy(() => import("../pages/template")),
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
		name: '模板',
		path: 'template',
		element: lazy(() => import("../pages/template"))
	},
	{
		name: '全局',
		path: '*',
		element: lazy(() => import("../pages/NotFound"))
	}
];

export default allRouter;
