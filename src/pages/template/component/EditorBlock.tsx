import { useContext, useEffect, useRef } from "react";
import ProviderEditor from "src/redux/ProviderEditor";
import styled from "styled-components";
import { IparamsBlock } from "../interfaceIparams";
import EditorPoint from "./EditorPoint";

interface Iparams {
	data: IparamsBlock;
	changeData: Function;
	onMouseDown: Function;
}

const POINT = {
    w: 5,
    h: 5,
    wSider: 12,
    hSider: 12
}

const EditorBlockStyle = styled.div`
	position: absolute;
	
	cursor: pointer;
    &.focus {
       
        cursor: move;
		&::before {
			border-color: #51d6a9;
		}
    }
	&::before {
		width: 100%;
		height: 100%;
		content: "";
		position: absolute;
		border: 1px dashed transparent;
		left: 0;
		top: 0;
	}
	&:hover {
		border-color: pink;
	}
	.shape-point {
		position: absolute;
		width: ${POINT.w}px;
		height: ${POINT.h}px;
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
	const { top, left, zIndex, keys, isNew, focus, width, height } = data;
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
					width: clientWidth,
					height: clientHeight
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
				width,
				height
			}}
            className={focus? 'focus': ''}
			onMouseDown={(e) => {
				onMouseDown(e, data);
			}}
			onContextMenu={(e) => {e.preventDefault()}}
		>
			{component.render()}
			{focus && <EditorPoint changeData={props.changeData} data={props.data}/>}
		</EditorBlockStyle>
	);
};

export default EditorBlock;
