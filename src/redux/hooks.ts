import { TypedUseSelectorHook } from "@types/react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";


export const useAppDispatch  =  () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState>  = useSelector
// export const useAppDispatch  =  () => useDispatch() as AppDispatch
// export const useAppSelector  = useSelector as TypedUseSelectorHook<RootState>