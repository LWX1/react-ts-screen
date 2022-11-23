import { MouseMenuState, MouseState } from "src/pages/template/data";
import { EditorStoreType } from "src/pages/template/interfaceIparams";

const state: EditorStoreType =  {
    // 容器大小
    box: {
        width: 500,
        height: 500,
    },
    // 组件
    blockList: [
        {
            top: 100,
            left: 100,
            keys: 1,
            zIndex: 1,
            id: 1,
            width: 100,
            height: 100,

        },
        {
            top: 300,
            left: 300,
            keys: 2,
            zIndex: 2,
            id: 2,
            width: 100,
            height: 100,
     
        },
        {
            top: 600,
            left: 600,
            keys: 3,
            zIndex: 3,
            id: 3,
            width: 100,
            height: 100,
      
        },
    ],
    // 右键菜单
    rightMenuShow: false,
    // 鼠标点击的当前组件套间
    currentComponent: {
        top: 0, left: 0, zIndex: 0, keys: 0, id: 0, width: 0, height:0
    },
    // 辅助线
    xLine: undefined,
    yLine: undefined,
    // 鼠标状态
    mouseState: MouseState.INITIAL,
    // 右键菜单
    mouseMenu: {
        state: MouseMenuState.HIDDEN,
        style: {
            left: 0,
            top: 0,
            bottom: 0,
        }
    }
}

export default state;