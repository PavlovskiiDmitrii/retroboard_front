import cn from "classnames";
import "./groupwrap.scss";

export const GroupWrap = ({ children }: any) => {
  return (
    <div>
      <div>
        Группы
      </div>
      <div className={cn("groupwrap")}>{children}</div>
    </div>
  );
};
