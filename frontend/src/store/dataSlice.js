
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
};

const dataSlice = createSlice({
    name: "modelData",
    initialState,
    reducers: {
        setModelData: (state, action) => {
            state.data = action.payload
        },


    },
});

export const { setModelData } = dataSlice.actions;
export default dataSlice.reducer;