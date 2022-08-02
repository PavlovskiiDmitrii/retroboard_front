import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../../model/IUser';

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    count: number;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    count: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment(state, actinos: PayloadAction<number>) {
            state.count += actinos.payload;
        },
        userFetching(state) {
            state.isLoading = true;
        },
        userFetchingSuccess(state, action: PayloadAction<IUser[]>) {
            state.isLoading = false;
            state.users = action.payload;
            state.error = '';
        },
        userFetchingError(state, actinos: PayloadAction<string>) {
            state.isLoading = false;
            state.error = actinos.payload;
        },
    }
})

export default userSlice.reducer;