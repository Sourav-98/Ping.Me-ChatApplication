import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSliceType } from "./AuthSliceType";

const initialState : AuthSliceType = {
    isLoggedIn: false
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        loadAuthTokens: (state: AuthSliceType, action: PayloadAction<AuthSliceType>): AuthSliceType => {
            return {
                ...action.payload
            }
        },
        wipeAuthTokens: (): AuthSliceType => {
            return initialState
        }
    }
});

export const { loadAuthTokens, wipeAuthTokens } = AuthSlice.actions;

export default AuthSlice;
