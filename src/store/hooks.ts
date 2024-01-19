// typesafe custom hooks
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux'

import { AppDispatch, RootState } from './store'

type DispatchFunction = () => AppDispatch

export const useGameDispatch: DispatchFunction = useDispatch

export const useGameSelector: TypedUseSelectorHook<RootState> = useSelector
