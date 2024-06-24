import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth" , 
    initialState : {
        isLoggedin : false,
        userId : ""

    },
    reducers : {
        setIsLoggedIn : (state , action)=>{
            state.isLoggedin = action.payload;
                },
        setUserId : (state , action)=>{
            state.userId = action.payload;
                },
        
    }
})

export const {setIsLoggedIn , setUserId} = authSlice.actions
export default authSlice.reducer;