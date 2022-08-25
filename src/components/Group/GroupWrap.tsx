import cn from "classnames";
import "./groupwrap.scss";

export const GroupWrap = ({ children }: any) => {
  return (
    <div className={cn("groupwrap")}> 
        {children}
    </div>
  );
};