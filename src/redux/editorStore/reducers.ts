import { createSlice } from '@reduxjs/toolkit'
import { DirectionsMap, MouseMenuState, MouseState } from 'src/pages/template/data';
import { IparamsBlock, IparamsLine, IparamsLineItemX, IparamsLineItemY } from 'src/pages/template/interfaceIparams';
import state from './state'

// 偏移量
const Threshold = 5;

export const reducerSlice = createSlice({
  name: 'editor',
  initialState: state,
  reducers: {
    // 更新state状态
    updateState: (state, action) => {
        return {
            ...state,
            ...action.payload
          }
    },
    // 添加组件
    addBlockList: (state, action)=> {
        state.blockList.push(action.payload);
    },
    // 鼠标按下选择组件
    mouseDown: (state, action) => {
      const {blockItem, ctrlKey} = action.payload;
      // 按住ctrl
      if(ctrlKey) {
        state.blockList.forEach(item => {
          if(item.id === blockItem.id) {
            item.focus = !item.focus
          }
        })
      }else {
        const selectedBlockList = state.blockList.filter(item => item.focus);
        // 没有选中多个
        if(selectedBlockList.length < 2) {
          state.blockList.forEach(item => {
            if(item.id === blockItem.id) {
              item.focus = true
            }else {
              item.focus = false
            }
          })
        }
      }
      state.mouseState = MouseState.DOWN;
    },
    // 鼠标选择组件后移动
    mouseMove: (state, action) => {
      // 偏移量
      const {deltaX,deltaY} = action.payload;
      let len = 0;
     
      state.blockList.forEach((item: IparamsBlock) => {
        if (item.focus) {
          item.left += deltaX;
          item.top += deltaY;
          len ++;
          if (len === 1) {
            state.currentComponent = item;
          }
        }
      });
    },
    // 清空容器和操作
    clearOperate: (state, action) => {
      state.blockList.forEach((item: IparamsBlock) => {
          item.focus = false;
          return item;
        });
        state.mouseMenu=  {
          ...state.mouseMenu,
          state: MouseMenuState.HIDDEN,
        };
    },
    // 辅助线
    getHelpLine: (state, action) => {
      const {noSelectedBlockList} = action.payload;
      const lines: {
        x: Array<IparamsLineItemX>;
        y: Array<IparamsLineItemY>;
      } = {
        x: [],
        y: [],
      };
    
      // 计算参考物和当前元素符合辅助线的x,y值
      noSelectedBlockList.forEach((item: IparamsBlock) => {
        DirectionsMap.y.forEach((yItem) => {
          lines.y.push(yItem.calc(item, state.currentComponent));
        });
        DirectionsMap.x.forEach((xItem) => {
          lines.x.push(xItem.calc(item, state.currentComponent));
        });
      });

      let yLine: number | undefined;
      let xLine: number | undefined;
      let { left, top } = state.currentComponent;

      // false 为不满足辅助线，则不更新数据
      let isUpdate = false;
      for (let i = 0; i < lines.y.length; i++) {
        const { triggerTop, lineTop } = lines.y[i];
        // 判断，存在阙值
        if (Math.abs(top - triggerTop) < Threshold) {
          // 满足竖辅助线出现条件 为xLine赋值
          yLine = lineTop;
          // 实现吸附效果
          top = triggerTop;
          isUpdate = true;
          break;
        }
      }
      for (let j = 0; j < lines.x.length; j++) {
        const { triggerLeft, lineLeft } = lines.x[j];
        if (Math.abs(left - triggerLeft) < Threshold) {
          // 满足竖辅助线出现条件 为xLine赋值
          xLine = lineLeft;
          // 实现吸附效果
          left = triggerLeft;
          isUpdate = true;
          break;
        }
      }
      if(isUpdate)
        state.blockList.forEach((item) => {
          if (state.currentComponent.id === item.id) {
            item.left = left;
            item.top = top
            
          }
        })
      state.xLine = xLine;
      state.yLine =yLine
      
    },
  }
})
export const { updateState, addBlockList, mouseDown, mouseMove, clearOperate, getHelpLine } = reducerSlice.actions

export default reducerSlice.reducer