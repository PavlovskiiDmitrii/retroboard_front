import { combineReducers, configureStore } from "@reduxjs/toolkit";
import myUserReduser from './reducers/MyUserSlice';
import myGroupsReduser from './reducers/MyGroupSlice';
import myRoomSlice from './reducers/MyRoomSlice';

const rootReducer = combineReducers({
    myUserReduser,
    myGroupsReduser,
    myRoomSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = AppStore['dispatch'];