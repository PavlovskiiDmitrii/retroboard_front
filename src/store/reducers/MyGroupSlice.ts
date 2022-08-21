import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroup } from "../../model/IGrous";

interface IMyGroupState extends IIsLoading {
  groups: IGroup[];
}

interface IIsLoading {
  isLoading: boolean;
}

const initialState: IMyGroupState = {
  groups: [],
  isLoading: false,
};

export const myGroupsSlice = createSlice({
  name: "myGroups",
  initialState,
  reducers: {
    myGroupFetching(state) {
      state.isLoading = true;
    },
    myGroupFetchingSuccess(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload;
      state.isLoading = false;
    },
    // TODO
    myGroupFetchingError(state, action: PayloadAction<string>) {
        state.groups = [];
        state.isLoading = false;
      },
  },
});

export default myGroupsSlice.reducer;
