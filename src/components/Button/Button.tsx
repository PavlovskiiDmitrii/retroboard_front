import cn from "classnames";
import "./style.scss";

export const Button = ({ text, onClick }: any) => {
  return (
    <button className={cn("button")} onClick={() => {
        onClick();
      }}>{text}</button>
  );
};