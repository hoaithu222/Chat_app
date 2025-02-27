import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic
        },
        logout: initialState,
    }
})
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;