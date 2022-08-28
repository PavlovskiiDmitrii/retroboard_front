import { myUserSlice } from "./MyUserSlice";
import { myGroupsSlice } from "./MyGroupSlice";
import { myRoomSlice } from "./MyRoomSlice";
import { IMyUser, IMyUserResponse } from "./../../model/IUser";
import { IGroup } from "../../model/IGroup";
import { IUser } from "../../model/IUser";
import { IRoom } from "../../model/IRoom";
import { AppDispath } from "./../store";
import axios from "axios";

export const fetchMyUser =
  (email: string, password: string) => async (dispatch: AppDispath) => {
    const pahtFetchMyUser = "http://localhost:3001/api/auth/singin";
    try {
      dispatch(myUserSlice.actions.myUserFetching());
      const { data } = await axios.post<IMyUserResponse>(pahtFetchMyUser, {
        email: email,
        password: password,
      });
      const id = data.id ? +data.id : null;
      const myUser: IMyUser = {
        id: id,
        name: data.name,
        role: data.role,
        email: data.email,
      };
      localStorage.setItem("Token", data.accessToken);
      localStorage.setItem("PasswordHash", data.password);
      localStorage.setItem("MyEmail", data.email ? data.email : "");
      dispatch(myUserSlice.actions.myUserFetchingSuccess(myUser));
    } catch (e) {
      dispatch(myUserSlice.actions.myUserFetchingError("errar"));
    }
  };

export const fetchUsersCheck =
  (emailProp: string, password: string) => async (dispatch: AppDispath) => {
    const myUserCheckApi = "http://localhost:3001/api/check";
    const token = localStorage.getItem("Token") || "";
    const headers = {
      "x-access-token": token,
    };

    try {
      dispatch(myUserSlice.actions.myUserCheckFetching());
      const { data } = await axios.post<IMyUserResponse>(
        myUserCheckApi,
        {
          email: emailProp,
          password: password,
        },
        {
          headers: headers,
        }
      );
      const { email, id, name, role } = data.my;
      dispatch(
        myUserSlice.actions.myUserCheckSuccess({ id, email, role, name })
      );
    } catch (e) {
      localStorage.clear();
      dispatch(myUserSlice.actions.myUserCheckFold());
    }
  };

///Group///

export const fetchMyGroup = (myId: number) => async (dispatch: AppDispath) => {
  const getGroupsByClientIdApi = "http://localhost:3001/api/groupsby";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    dispatch(myGroupsSlice.actions.myGroupFetching());
    const { data } = await axios.get<IGroup[]>(
      `${getGroupsByClientIdApi}?client_id=${myId}`,
      {
        headers: headers,
      }
    );
    const myGroupsId: IGroup[] = data;
    dispatch(myGroupsSlice.actions.myGroupFetchingSuccess(myGroupsId));
  } catch (e) {
    dispatch(myGroupsSlice.actions.myGroupFetchingError("Error fetchMyGroup"));
  }
};

export const fetchAddClientToGroup = (group_id : number, email: string) => async (dispatch: AppDispath) => {
  const getGroupsByClientIdApi = "http://localhost:3001/api/createconnectionfroupwithclient";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    dispatch(myGroupsSlice.actions.fetchAddClientToGroup());
    const { data } = await axios.post<IUser>(
      `${getGroupsByClientIdApi}`,
      {
        "group_id" : group_id,
        "email": email
      },
      {
        headers: headers,
      }
    );
    const addingUser: IUser = data;
    dispatch(myGroupsSlice.actions.addClientToGroupSuccess({addingUser: addingUser, group_id: group_id}));
  } catch (e) {
    alert('error fetchAddClientToGroup')
    // dispatch(myGroupsSlice.actions.myGroupFetchingError("Error fetchMyGroup"));
  }
};

export const fetchRemoveClientToGroup = (group_id : number, user_id: number) => async (dispatch: AppDispath) => {
  const getGroupsByClientIdApi = "http://localhost:3001/api/deleteClientFromGroup";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    dispatch(myGroupsSlice.actions.fetchAddClientToGroup());
    const _ = await axios.delete<any>(
      `${getGroupsByClientIdApi}?client_id=${user_id}&tgroup_id=${group_id}`,
      {
        headers: headers,
      }
    );
    dispatch(myGroupsSlice.actions.removeClientToGroupSuccess({user_id, group_id}));
  } catch (e) {
    alert('error fetchRemoveClientToGroup')
    // dispatch(myGroupsSlice.actions.myGroupFetchingError("Error fetchMyGroup"));
  }
};

export const createGroup = (myId: number, title: string) => async (dispatch: AppDispath) => {
  const createGroupApi = "http://localhost:3001/api/group";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    const { data } = await axios.post<IGroup>(
      `${createGroupApi}`,
      {
        title : title,
        owner_id: myId
      },
      {
        headers: headers,
      }
    );
    dispatch(myGroupsSlice.actions.addNewGroupSuccess(data));
  } catch (e) {
    dispatch(myGroupsSlice.actions.addNewFroupError());
  }
};


///ROOM///

export const fetchMyRoom = (myId: number) => async (dispatch: AppDispath) => {
  const getRoomsByClientIdApi = "http://localhost:3001/api/rooms";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    dispatch(myRoomSlice.actions.myRoomsFetching());
    const { data } = await axios.get<IRoom[]>(
      `${getRoomsByClientIdApi}?id=${myId}`,
      {
        headers: headers,
      }
    );
    const myRooms: IRoom[] = data;
    dispatch(myRoomSlice.actions.myRoomsFetchingSuccess(myRooms));
  } catch (e) {
    //TODO
    // dispatch(myRoomSlice.actions.myGroupFetchingError("Error fetchMyGroup"));
  }
};

export const createRoom = (myId: number, title: string) => async (dispatch: AppDispath) => {
  const createRoomApi = "http://localhost:3001/api/room";
  const token = localStorage.getItem("Token") || "";
  const headers = {
    "x-access-token": token,
  };
  try {
    const { data } = await axios.post<IRoom[]>(
      `${createRoomApi}`,
      {
        title : title,
        owner_id: myId
      },
      {
        headers: headers,
      }
    );
    const newRoom: IRoom = data[0];
    dispatch(myRoomSlice.actions.addNewRoomSuccess(newRoom));
  } catch (e) {
    dispatch(myRoomSlice.actions.addNewRoomError());
  }
};