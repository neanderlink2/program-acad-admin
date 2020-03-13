import { createSlice } from '@reduxjs/toolkit';

const criarTurmaSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: '',
        errors: []
    },
    reducers: {
        criarTurmaRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        criarTurmaSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        criarTurmaFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = '';
            state.errors = action.payload;
        },
    }
});

export const { criarTurmaFalha, criarTurmaRequest, criarTurmaSucesso } = criarTurmaSlice.actions;
export default criarTurmaSlice.reducer;