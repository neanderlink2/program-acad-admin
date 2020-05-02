import { createSlice } from '@reduxjs/toolkit';

const getNiveisDificuldadeSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getNiveisDificuldadeRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getNiveisDificuldadeSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getNiveisDificuldadeFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const {
    getNiveisDificuldadeFalha,
    getNiveisDificuldadeRequest,
    getNiveisDificuldadeSucesso
} = getNiveisDificuldadeSlice.actions;
export default getNiveisDificuldadeSlice.reducer;