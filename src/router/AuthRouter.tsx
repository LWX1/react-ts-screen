import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { prefixRoute } from "../config/config";

const AuthRouter = (props: {
	children: ReactNode
}) => {
	const { children } = props;
	const history = useNavigate();
	const isLogin = localStorage.getItem("token");
	if (!isLogin) history(`${prefixRoute}/login`);
	return <>
		{children}
	</>;
};

export default AuthRouter;
