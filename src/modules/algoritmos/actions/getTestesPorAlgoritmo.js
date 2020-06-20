import { createSlice } from '@reduxjs/toolkit';

const getTestesPorAlgoritmoSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getTestesPorAlgoritmoRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getTestesPorAlgoritmoSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getTestesPorAlgoritmoFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const {
    getTestesPorAlgoritmoFalha,
    getTestesPorAlgoritmoRequest,
    getTestesPorAlgoritmoSucesso
} = getTestesPorAlgoritmoSlice.actions;
export default getTestesPorAlgoritmoSlice.reducer;