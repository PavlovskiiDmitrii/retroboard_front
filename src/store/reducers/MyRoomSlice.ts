import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../../model/IRoom";

interface IMyGroupState extends IIsLoading {
  rooms: IRoom[];
}

interface IIsLoading {
  isLoading: boolean;
}

const initialState: IMyGroupState = {
  rooms: [],
  isLoading: false,
};

export const myRoomSlice = createSlice({
  name: "myRooms",
  initialState,
  reducers: {
    myRoomsFetching(state) {
      state.isLoading = true;
    },
    myRoomsFetchingSuccess(state, action: PayloadAction<IRoom[]>) {
      state.rooms = action.payload;
      state.isLoading = false;
    },
    addNewRoomSuccess(state, action: PayloadAction<IRoom>) {
      state.rooms = [...state.rooms, action.payload];
      state.isLoading = false;
    },
    addNewRoomError(state) {
      state.isLoading = false;
    },
//     // TODO
//     myGroupFetchingError(state, action: PayloadAction<string>) {
//         state.groups = [];
//         state.isLoading = false;
//       },
  },
});

export default myRoomSlice.reducer;
