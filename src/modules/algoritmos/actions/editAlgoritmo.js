import { createSlice } from '@reduxjs/toolkit';

const editAlgoritmoSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: undefined,
        errors: []
    },
    reducers: {
        editAlgoritmoRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        editAlgoritmoSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        editAlgoritmoFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = undefined;
            state.errors = action.payload;
        },
    }
});

export const {
    editAlgoritmoFalha,
    editAlgoritmoRequest,
    editAlgoritmoSucesso
} = editAlgoritmoSlice.actions;
export default editAlgoritmoSlice.reducer;