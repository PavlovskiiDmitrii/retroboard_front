import { myUserSlice } from "./MyUserSlice";
import { myGroupsSlice } from "./MyGroupSlice";
import { IMyUser, IMyUserResponse } from "./../../model/IUser";
import { IGroup } from "../../model/IGrous";
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
