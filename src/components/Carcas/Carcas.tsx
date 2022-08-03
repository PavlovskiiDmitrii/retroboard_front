import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUsers, fetchMyUser } from "../../store/reducers/ActionCreators";
import { userSlice } from "../../store/reducers/UseSlice";
import { checkAuthorization } from "../../utils/auth";
import { Main } from "../Main/Main";

const SignIn = ({ props }: any) => {
  const [error, setError] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  return (
    <div>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
      />
      <span>test@mial.ru</span>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="text"
      />
      <span>test</span>
      <button
        onClick={() => {
          dispatch(fetchMyUser(email, password));
        }}
      >
        Авторизоваться
      </button>
    </div>
  );
};

const SignUp = ({ props }: any) => {
  return (
    <div>
      <input type="text" />
      <input type="text" />
      <button>Загесистрироваться</button>
    </div>
  );
};

type ISign = "signin" | "signup";

const Auth = ({ props }: any) => {
  const [state, setState] = useState<ISign>("signin");
  return (
    <div>
      {state === "signin" ? <SignIn /> : <SignUp />}
      <div>
        <button
          onClick={() => {
            setState("signin");
          }}
        >
          Авторизоваться
        </button>
        <button
          onClick={() => {
            setState("signup");
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export const Carcas = ({ props }: any) => {
  const dispatch = useAppDispatch();
  const { count, users } = useAppSelector((state) => state.userReduser);
  const { my } = useAppSelector((state) => state.myUserReduser);
  const { increment } = userSlice.actions;
  const [auth, setAuth] = useState<boolean>(checkAuthorization());

  useEffect(() => {
    if (my.id) {
      setAuth(true);
    }
  }, [my])

  return (
    <div>{auth ? <Main /> : <Auth />}</div>
    // <>
    //   <div>Carcas</div>
    //   <div>{count}</div>
    //   <button
    //     onClick={() => {
    //       dispatch(increment(123));
    //     }}
    //   >
    //     INCREMENT
    //   </button>

    //   <button
    //     onClick={() => {
    //       dispatch(fetchUsers());
    //     }}
    //   >
    //     FETCH USER
    //   </button>

    //   <div>
    //     {
    //         users.map((user) => (
    //             <div>
    //                 <div>{user.name}</div>
    //                 <div>{user.email}</div>
    //             </div>
    //         ))
    //     }
    // </div>
    // </>
  );
};
