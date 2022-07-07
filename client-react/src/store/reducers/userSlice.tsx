import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../../types/user'

const initialState: IUserState = {
  loadingFetch: false,
  username: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadingTrue: (state: IUserState) => {
      state.loadingFetch = true
    },
    loadingFalse: (state: IUserState) => {
      state.loadingFetch = false
    },
    setUsername: (state: IUserState, action: PayloadAction<string>) => {
      state.username = action.payload
    }
  }
})

export const { loadingTrue, loadingFalse, setUsername } = userSlice.actions

export default userSlice.reducer
