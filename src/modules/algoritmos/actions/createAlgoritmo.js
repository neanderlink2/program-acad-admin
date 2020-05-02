import { createSlice } from '@reduxjs/toolkit';

const createAlgoritmoSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: undefined,
        errors: []
    },
    reducers: {
        createAlgoritmoRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        createAlgoritmoSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        createAlgoritmoFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = undefined;
            state.errors = action.payload;
        },
    }
});

export const {
    createAlgoritmoFalha,
    createAlgoritmoRequest,
    createAlgoritmoSucesso
} = createAlgoritmoSlice.actions;
export default createAlgoritmoSlice.reducer;