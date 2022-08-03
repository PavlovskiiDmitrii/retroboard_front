import { userSlice } from "./UseSlice";
import { myUserSlice } from "./MyUserSlice";
import { IUser, IMyUser, IMyUserResponse } from "./../../model/IUser";
import { AppDispath } from "./../store";
import axios from "axios";

export const fetchUsers = () => async (dispatch: AppDispath) => {
  try {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            id: 123,
            name: "test",
            email: "test@mail.ru",
          },
        ]);
      }, 500);
    });
    dispatch(userSlice.actions.userFetching());
    const response = await promise;
    dispatch(userSlice.actions.userFetchingSuccess(response as IUser[]));
  } catch (e) {
    dispatch(userSlice.actions.userFetchingError("errar"));
  }
};

const paht = "http://localhost:3001/api/auth/singin";

export const fetchMyUser =
  ( email: string, password: string) =>
  async (dispatch: AppDispath) => {
    try {
      dispatch(myUserSlice.actions.myUserFetching());
      const { data } = await axios.post<IMyUserResponse>(paht, {
        email: email,
        password: password,
      });
      const myUser: IMyUser = {
        id: +data.id,
        name: data.name,
        role: data.role,
        email: data.email,
      };
      localStorage.setItem("Token", data.accessToken);
      dispatch(myUserSlice.actions.myUserFetchingSuccess(myUser));
    } catch (e) {
      dispatch(userSlice.actions.userFetchingError("errar"));
    }
  };
