import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { checkAuthorization } from "../../utils/auth";
import { fetchUsersCheck } from "../../store/reducers/ActionCreators";
import { Main } from "../Main/Main";
import cn from "classnames";
import "./style.scss";

import { Auth } from "../Auth/Auth";

export const Carcas = ({ props }: any) => {
  const { isCheck } = useAppSelector((state) => state.myUserReduser);
  const [auth, setAuth] = useState<boolean>(checkAuthorization());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersCheck(localStorage.getItem("MyEmail") || '', localStorage.getItem("PasswordHash")|| '') );
  // TODO https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  }, []);

    useEffect(() => {
    if (isCheck) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [isCheck]);

  return <div className={cn("carcas")}>{auth ? <Main /> : <Auth />}</div>;
};
