import { Button, Input } from "antd";
import { ComponentProps } from "./interfaceIparams";

type ComponentMapProps = {
    [key: string]: ComponentProps
}

const createEditorConfig = () => {
    const componentList: ComponentProps[] = [];
    const componentMap: ComponentMapProps = {};
    return {
        register(props: ComponentProps) {
            componentList.push(props);
            componentMap[props.keys] = props;
        },
        componentList,
        componentMap
    }
}

export const registerConfig = createEditorConfig();

registerConfig.register({
    label: '文本',
    preview: () => '预览文本',
    render: () => <div style={{whiteSpace: 'nowrap'}}>渲染文本</div>,
    type: 'text',
    keys: 1
});

registerConfig.register({
    label: '按钮',
    preview: () => <Button>预览按钮</Button>,
    render: () => <Button>渲染按钮</Button>,
    type: 'button',
    keys: 2
});

registerConfig.register({
    label: '输入框',
    preview: () =><Input />,
    render: () => <Input />,
    type: 'input',
    keys: 3
});