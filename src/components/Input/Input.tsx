import cn from "classnames";
import "./style.scss";

export const Input = ({ value, placeholder, cb, type = "text" }: any) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        className={cn("input")}
        value={value}
        onChange={(e) => {
          cb(e.target.value);
        }}
        type={type}
      />
      <div></div>
    </div>
  );
};