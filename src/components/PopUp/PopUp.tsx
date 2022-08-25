import cn from "classnames";
import "./style.scss";

export const PopUp = ({ activatePopUp, children }: any) => {
  return (
    <div className={cn({
        "popup": true,
        "popup_open": activatePopUp
    })}>
        {children}
    </div>
  );
};

