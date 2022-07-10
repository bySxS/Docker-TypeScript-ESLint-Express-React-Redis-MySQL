import { RootState } from '../index'

export const loadingFetch = (state: RootState): boolean => {
  return state.user.loadingFetch
}

export const username = (state: RootState): string => {
  return state.user.username
}
