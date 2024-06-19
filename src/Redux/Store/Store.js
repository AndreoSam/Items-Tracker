import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Reducer/mediaSlice";


const Store = configureStore({
    reducer: {
        user: reducer,
    }
})

export default Store;