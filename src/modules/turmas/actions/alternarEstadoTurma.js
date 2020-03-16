import { createSlice } from '@reduxjs/toolkit';

const alternarEstadoTurmaSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: '',
        errors: []
    },
    reducers: {
        alternarEstadoTurmaRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        alternarEstadoTurmaSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        alternarEstadoTurmaFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = '';
            state.errors = action.payload;
        },
    }
});

export const { alternarEstadoTurmaFalha, alternarEstadoTurmaRequest, alternarEstadoTurmaSucesso } = alternarEstadoTurmaSlice.actions;
export default alternarEstadoTurmaSlice.reducer;