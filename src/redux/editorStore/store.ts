import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

export default configureStore({
  reducer: {
    editor: reducers
  }
})
