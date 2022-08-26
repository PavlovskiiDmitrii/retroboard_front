import cn from "classnames";
import "./style.scss";

export const Group = ({ title, length }: any) => {
  return (
    <div className={cn("group")}> 
        {title} _ +{length}
    </div>
  );
};