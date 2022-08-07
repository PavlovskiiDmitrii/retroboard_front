import cn from "classnames";
import { useState } from "react";
import "./style.scss";

export const LeftBar = ({ props }: any) => {
  const [activate, setActivate] = useState(false);
  return (
    <div className={cn("leftBar", activate && "leftBar_activate")}>
      left-side
      <button onClick={() => {
        setActivate(!activate);
      }}>'asdasd'</button>
    </div>
  );
};
