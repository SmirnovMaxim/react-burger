import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, AppThunk, TRootStore} from '../types/stores/TRootStore';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<TRootStore> = selectorHook;
