import{ useEffect, useState, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

import { Layout, Menu, message } from "antd";

const {Header} = Layout;

const { Sider, Content } = Layout;

const BaseLayout = () => {
	
	useEffect(() => {

	}, []);


	// console.log("menuData", menuData, props.location.pathname);
	return (
		<Layout className="home">
			<Header>header</Header>
			<Layout
				className="body"
				style={{
					background: "#FAFAFA"
				}}>
				<Sider className="sider">
					左边
				</Sider>
				<Content className="content">
					<Suspense fallback={<p>加载中..</p>}>
						<Outlet />
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
