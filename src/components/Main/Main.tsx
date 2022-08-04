import cn from "classnames";
import "./style.scss";

export const Main = ({ props }: any) => {
  return <div className={cn("main__wrap")}>
    <div>left-side</div>
    <div>main</div>
  </div>;
};
