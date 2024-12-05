
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latitude: 0,
    longitude: 0,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLatitude: (state, action) => {
            state.latitude = action.payload;
            state.longitude = action.payload;
        },
        setLongitude: (state, action) => {
            state.longitude = action.payload;
        },

    },
});

export const { setLatitude,setLongitude } = locationSlice.actions;
export default locationSlice.reducer;