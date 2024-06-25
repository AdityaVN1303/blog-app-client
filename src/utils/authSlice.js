import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth" , 
    initialState : {
        isLoggedin : false,
        userId : "",
        user : {}

    },
    reducers : {
        setIsLoggedIn : (state , action)=>{
            state.isLoggedin = action.payload;
                },
        setUserId : (state , action)=>{
            state.userId = action.payload;
                },
        setUser : (state , action)=>{
            state.user = action.payload;
                },
        
    }
})

export const {setIsLoggedIn , setUserId , setUser} = authSlice.actions
export default authSlice.reducer;