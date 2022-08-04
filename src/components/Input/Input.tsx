import cn from "classnames";
import "./style.scss";

export const Input = ({ value, placeholder, cb, type = "test" }: any) => {
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

{
  /* <input
value={email}
onChange={(e) => {
  setEmail(e.target.value);
}}
type="text"
/> */
}
