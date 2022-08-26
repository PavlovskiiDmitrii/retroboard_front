import cn from "classnames";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Button } from "../Button/Button";
import { GroupWrap } from "../Group/GroupWrap";
import "./style.scss";

export const LeftBar = ({ props }: any) => {
  const { my } = useAppSelector((state) => state.myUserReduser);
  const [activate, setActivate] = useState(false);

  return (
    <div className={cn("leftBar", activate && "leftBar_activate")}>
      <GroupWrap myId={my.id} />

      <Button
        onClick={() => {
          setActivate(!activate);
        }}
        text={"Открыть"}
      />
    </div>
  );
};
