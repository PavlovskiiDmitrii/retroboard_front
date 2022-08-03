import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMyUser } from '../../model/IUser';

interface IMyUserState extends IIsLoading {
    my: IMy;
}

interface IIsLoading {
    isLoading: boolean
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
    isLoading: false
}

export const myUserSlice = createSlice({
    name: 'myIser',
    initialState,
    reducers: {
        myUserFetching(state) {
            state.isLoading = true;
        },
        myUserFetchingSuccess(state, action: PayloadAction<IMyUser>) {
            state.isLoading = false;
            state.my = action.payload;
        }
    }
})

export default myUserSlice.reducer;