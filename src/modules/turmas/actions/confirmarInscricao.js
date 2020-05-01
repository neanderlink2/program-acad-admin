import { createSlice } from '@reduxjs/toolkit';

const confirmarInscricaoSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: '',
        errors: []
    },
    reducers: {
        confirmarInscricaoRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        confirmarInscricaoSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        confirmarInscricaoFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = '';
            state.errors = action.payload;
        },
    }
});

export const {
    confirmarInscricaoFalha,
    confirmarInscricaoRequest,
    confirmarInscricaoSucesso
} = confirmarInscricaoSlice.actions;
export default confirmarInscricaoSlice.reducer;