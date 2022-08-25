import cn from "classnames";
import "./style.scss";

export const Group = ({ title }: any) => {
  return (
    <div className={cn("group")}> 
        {title}
    </div>
  );
};