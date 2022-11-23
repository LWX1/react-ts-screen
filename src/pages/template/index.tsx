import store from "src/redux/editorStore/store";
import { Provider } from "react-redux";
import TemplateContainer from "./TemplateContainer";

const Template = () => {
	return (
		<Provider store={store}>
			<TemplateContainer />
		</Provider>
	);
};

export default Template;
