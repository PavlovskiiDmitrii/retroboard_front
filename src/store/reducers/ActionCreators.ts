import { userSlice } from "./UseSlice";
import { IUser } from "./../../model/IUser";
import { AppDispath } from "./../store";

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
    const response: any = await promise;
    dispatch(userSlice.actions.userFetchingSuccess(response as IUser[]));
  } catch (e) {
    dispatch(userSlice.actions.userFetchingError('errar'));
  }
};
