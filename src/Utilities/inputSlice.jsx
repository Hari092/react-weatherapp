import { createSlice } from "@reduxjs/toolkit";

const inputSlice =createSlice({
    name:"input",
    initialState:{
        city:'',
        country:''
    },
    reducers:{
        setInput: (state, action) => {
            state.city = action.payload.city;
            state.country = action.payload.country;
          }
    }
})
export const { setInput } = inputSlice.actions;
export default inputSlice.reducer;