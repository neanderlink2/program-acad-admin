import { createSlice } from '@reduxjs/toolkit';

const getTurmaByIdSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getTurmaByIdRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getTurmaByIdSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getTurmaByIdFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const { getTurmaByIdFalha, getTurmaByIdRequest, getTurmaByIdSucesso } = getTurmaByIdSlice.actions;
export default getTurmaByIdSlice.reducer;