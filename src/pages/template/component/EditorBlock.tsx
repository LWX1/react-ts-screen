import { MouseEventHandler, useContext, useEffect, useRef } from "react";
import ProviderEditor from "src/redux/ProviderEditor";
import styled from "styled-components";
import { IparamsBlock } from "../interfaceIparams";
import EditorFocus from "./EditorFocus";

interface Iparams {
	data: IparamsBlock;
	changeData: Function;
	onMouseDown: Function;
}

const POINT = {
    w: 4,
    h: 4,
    wSider: 10,
    hSider: 10
}

const EditorBlockStyle = styled.div`
	position: absolute;
	border: 1px dashed transparent;
	cursor: pointer;
    &.focus {
        border-color: #51d6a9;
        cursor: move;
    }
	&:hover {
		border-color: pink;
	}
	.shape-point {
		position: absolute;
		width: ${POINT.w/2}px;
		height: ${POINT.h/2}px;
        border-radius: 5px;
        background-color: #fff;
		&.t {
			top: -${POINT.h/2}px;
            left: 50%;
            transform: translateX(-50%);
			width: ${POINT.wSider}px;
			cursor: n-resize;
		}
		&.b {
			bottom: -${POINT.h/2}px;
            left: 50%;
            transform: translateX(-50%);
			width: ${POINT.wSider}px;
			cursor: s-resize;
		}
		&.l {
			left: -${POINT.w/2}px;
            top: 50%;
            transform: translateY(-50%);
			height: ${POINT.hSider}px;
			cursor: w-resize;
		}
		&.r {
			right: -${POINT.w/2}px;
            top: 50%;
            transform: translateY(-50%);
			height: ${POINT.hSider}px;
			cursor: e-resize;
		}
		&.lt {
			top: -${POINT.h/2}px;
			left: -${POINT.w/2}px;
			cursor: nw-resize;
		}
		&.lb {
			bottom: -${POINT.h/2}px;
			left: -${POINT.w/2}px;
			cursor: sw-resize;
		}
		&.rt {
			top: -${POINT.h/2}px;
			right: -${POINT.w/2}px;

			cursor: ne-resize;
		}
		&.rb {
			bottom: -${POINT.h/2}px;
			right: -${POINT.w/2}px;

			cursor: se-resize;
		}
	}
`;

const EditorBlock = (props: Iparams) => {
	const { componentMap } = useContext(ProviderEditor);

	const refEditor = useRef<HTMLDivElement>(null);
	const { data, onMouseDown } = props;
	const { top, left, zIndex, keys, isNew, focus } = data;
	const component = componentMap[keys];
	useEffect(() => {
		if (isNew) {
			const { clientHeight, clientWidth } = refEditor.current || {};
			props.changeData &&
				props.changeData({
					...data,
					isNew: false,
					left: left - (clientWidth as number) / 2,
					top: top - (clientHeight as number) / 2,
				});
		}
	}, [props]);
	return (
		<EditorBlockStyle
			ref={refEditor}
			style={{
				top,
				left,
				zIndex,
			}}
            className={focus? 'focus': ''}
			onMouseDown={(e) => {
				onMouseDown(e, data);
			}}
		>
			{component.render()}
			{focus && <EditorFocus />}
		</EditorBlockStyle>
	);
};

export default EditorBlock;