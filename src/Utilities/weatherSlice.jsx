import { createSlice } from "@reduxjs/toolkit";

const weather = createSlice({
    name:"weather",
    initialState:{
        weatherCointainer:[]
    },
    
    reducers:{
        addWeather:(state,action)=>{
            state.weatherCointainer.unshift(action.payload)
        },
        removeWeather:(state,action)=>{
            state.weatherCointainer.splice(action.payload,1)
        }
    }
})

export const {addWeather, removeWeather} = weather.actions;
export default weather.reducer