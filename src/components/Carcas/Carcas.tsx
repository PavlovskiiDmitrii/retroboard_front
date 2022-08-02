import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../model/IUser";
import { fetchUsers } from "../../store/reducers/ActionCreators";
import { userSlice } from "../../store/reducers/UseSlice";

export const Carcas = ({ props }: any) => {
  const dispatch = useAppDispatch();
  const { count, users } = useAppSelector((state) => state.userReduser);
  const { increment } = userSlice.actions;

  return (
    <>
      <div>Carcas</div>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(increment(123));
        }}
      >
        INCREMENT
      </button>

      <button
        onClick={() => {
          dispatch(fetchUsers());
        }}
      >
        FETCH USER
      </button>

      <div>
        {
            users.map((user) => (
                <div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                </div>
            ))
        }
    </div>
    </>
  );
};
