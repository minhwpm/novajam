import * as ReactRedux from "react-redux";
import { AppDispatch, RootState } from "./store";


export const useAppDispatch  =  () => ReactRedux.useDispatch<AppDispatch>()
export const useAppSelector: ReactRedux.TypedUseSelectorHook<RootState>  = ReactRedux.useSelector