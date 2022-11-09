import { useContext, useRef } from "react";
import ProviderEditor from "src/redux/ProviderEditor";
import styled from "styled-components";

const MaterialBlockStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MaterialItem = styled.div`
    display: flex;
    flex-direction: column;
    background: #ccc;
    margin-bottom: 20px;
    padding: 10px;
`;

const MaterialBlock = (props: any) => {
    const {dragStart, dragEnd} = props;
	const { componentList } = useContext(ProviderEditor);

    
	return (
		<MaterialBlockStyle>
			{componentList.map((item) => (
				<MaterialItem key={item.keys} draggable onDragStart={(e) => dragStart(e, item)} onDragEnd={dragEnd}>
					<span>{item.label}</span>
					<span>{item.preview()}</span>
				</MaterialItem>
			))}
		</MaterialBlockStyle>
	);
};

export default MaterialBlock;
