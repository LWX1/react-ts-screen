
import { CSSProperties } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { MouseMenuList } from "../data";

interface Iparams {
    dom?: Element;
    style: CSSProperties;
}

const EditorMenuStyle = styled.div`
    background-color: rgb(72, 72, 78);
    color: #fff;
    padding: 5px 20px;
    position: fixed;
    z-index: 2;
    >div {
        cursor: pointer;

        &:hover {
            
            text-decoration: underline;
        }
    }
`;

const EditorMenu = (props: Iparams) => {
    const {dom, ...others} = props
    return ReactDOM.createPortal(<EditorMenuStyle {...others} onContextMenu={(e) => e.preventDefault()}>
        {
            MouseMenuList.map(item => (
                <div key={item.name}>{item.name}</div>
            ))
        }
    </EditorMenuStyle>, dom || document.body)
}

export default EditorMenu;