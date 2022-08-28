import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGroup } from "../../model/IGroup";
import { IUser } from "../../model/IUser";

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
    addNewGroupSuccess(state, action: PayloadAction<IGroup>) {
      state.groups = [...state.groups, action.payload];
      state.isLoading = false;
    },

    fetchAddClientToGroup(state) {
      state.isLoading = true;
    },
    addClientToGroupSuccess(state, action: PayloadAction<{addingUser : IUser, group_id: number}>) {
      state.groups = state.groups.map((group) => {
        if (group.id === action.payload.group_id) {
          return {...group, clients : [...group.clients, action.payload.addingUser]};
        } else {
          return group;
        }
      })
      state.isLoading = false;
    },
    fetchRemoveClientToGroup(state) {
      state.isLoading = true;
    },
    removeClientToGroupSuccess(state, action: PayloadAction<{user_id : number, group_id: number}>) {
      state.groups = state.groups.map((group) => {
        if (group.id === action.payload.group_id) {
          return {...group, clients : group.clients.filter((client) => {
            if (client.id !== action.payload.user_id) {
              return client;
            }
          })};
        } else {
          return group;
        }
      })
      state.isLoading = false;
    },
    addNewFroupError(state) {
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
