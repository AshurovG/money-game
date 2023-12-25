import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainDataReducer from 'slices/MainSlice'

export default configureStore({
    reducer: combineReducers({
        mainData: mainDataReducer,
    })
})