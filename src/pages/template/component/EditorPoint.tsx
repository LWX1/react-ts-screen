
import { IparamsBlock } from "../interfaceIparams";

// 锚点
const pointList = ["t", "r", "b", "l", "lt", "rt", "lb", "rb"];

// 光标朝向
// const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se'];

// 描点
const EditorPoint = (props: { changeData: Function; data: IparamsBlock }) => {
    const { changeData, data } = props;
    const mouseDown = (e: any, point: string) => {
        e.stopPropagation();
        e.preventDefault();

        const offset = {
            x: e.pageX,
            y: e.pageY,
            l: data.left,
            t: data.top,
            w: data.width,
            h: data.height,
        };

        const mousemove = (e: MouseEvent) => {
            // console.log(e)
            const { pageX, pageY } = e;
            let deltaX = pageX - offset.x;
            let deltaY = pageY - offset.y;
           

            const isTop = /t/.test(point);
            const isBottom = /b/.test(point);
            const isLeft = /l/.test(point);
            const isRight = /r/.test(point);

            const newHeight =
                offset.h + (isTop ? -deltaY : isBottom ? deltaY : 0);
            const newWidth =
                offset.w + (isLeft ? -deltaX : isRight ? deltaX : 0);
            const newLeft = offset.l + (isLeft ? deltaX : 0);
            const newTop = offset.t + (isTop ? deltaY : 0);

            offset.x = pageX;
            offset.y = pageY;
            offset.w = newWidth;
            offset.h = newHeight;
            offset.l = newLeft;
            offset.t = newTop;

            changeData({
                ...data,
                width: newWidth,
                height: newHeight,
                left: newLeft,
                top: newTop,
            });
        };
        const mouseup = () => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    };
    return (
        <>
            {pointList.map((item) => (
                <div
                    key={item}
                    className={`shape-point ${item}`}
                    onMouseDown={(e) => mouseDown(e, item)}
                />
            ))}
        </>
    );
};

export default EditorPoint;
