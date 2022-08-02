import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReduser from './reducers/UseSlice'

const rootReducer = combineReducers({
    userReduser
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = AppStore['dispatch'];