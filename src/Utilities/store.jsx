import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./weatherSlice";
import inputSlice from "./inputSlice";

const store= configureStore({
    reducer:{
        weather:weatherSlice,
        input:inputSlice
    }
})

export default store;