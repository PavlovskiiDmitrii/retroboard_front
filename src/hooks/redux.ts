import { AppDispath, RootState } from './../store/store';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispath>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;