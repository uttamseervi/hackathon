// store.js

import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice"
import dataSlice from "./dataSlice"

const store = configureStore({
    reducer: {
        location: locationSlice,
        modelData:dataSlice

    },
});

export default store;