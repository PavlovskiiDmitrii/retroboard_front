import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMyUser } from '../../model/IUser';

interface IMyUserState extends IIsLoading {
    my: IMyUser;
}

interface IIsLoading {
    isLoading: boolean,
    isCheck: boolean,
}

const initialState: IMyUserState  = {
    my : {
        id: null,
        name: null,
        role: null,
        email: null
    },
    isLoading: false,
    isCheck: false,
}

export const myUserSlice = createSlice({
    name: 'myIser',
    initialState,
    reducers: {
        myUserCheckFetching(state) {
            state.isCheck = false;
        },
        myUserCheckSuccess(state, action: PayloadAction<IMyUser>) {
            state.isCheck = true;
            state.my = action.payload;
        },
        myUserCheckFold(state) {
            state.isCheck = false;
        },
        ////////////////
        myUserFetching(state) {
            state.isLoading = true;
        },
        myUserFetchingSuccess(state, action: PayloadAction<IMyUser>) {
            state.isLoading = false;
            state.my = action.payload;
            state.isCheck = true;
        },
        myUserFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
        }
    }
})

export default myUserSlice.reducer;