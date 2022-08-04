import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { checkAuthorization } from "../../utils/auth";
import { Main } from "../Main/Main";
import cn from "classnames";
import "./style.scss";

import { Auth } from "../Auth/Auth";

export const Carcas = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const [auth, setAuth] = useState<boolean>(checkAuthorization());

  useEffect(() => {
    if (my.id) {
      setAuth(true);
    }
  }, [my]);

  return <div className={cn("carcas")}>{auth ? <Main /> : <Auth />}</div>;
};
