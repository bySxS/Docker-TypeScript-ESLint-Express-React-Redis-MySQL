import { IRootState } from '../index'

export const loadingFetch = (state: IRootState): boolean => {
  return state.user.loadingFetch
}

export const username = (state: IRootState): string => {
  return state.user.username
}
