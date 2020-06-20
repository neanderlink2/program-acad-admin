import { createSlice } from '@reduxjs/toolkit';

const editarTurmaSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: '',
        errors: []
    },
    reducers: {
        editarTurmaRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        editarTurmaSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        editarTurmaFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = '';
            state.errors = action.payload;
        },
    }
});

export const {
    editarTurmaFalha,
    editarTurmaRequest,
    editarTurmaSucesso
} = editarTurmaSlice.actions;
export default editarTurmaSlice.reducer;