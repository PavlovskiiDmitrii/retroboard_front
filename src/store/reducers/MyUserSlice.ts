import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMyUser } from '../../model/IUser';

interface IMyUserState extends IIsLoading {
    my: IMy;
}

interface IIsLoading {
    isLoading: boolean,
    isCheck: boolean,
}

interface IMy {
    id: number | null;
    name: string | null;
    role: string | null;
    email: string | null;
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
        myUserCheckSuccess(state) {
            state.isCheck = true;
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
        }
    }
})

export default myUserSlice.reducer;