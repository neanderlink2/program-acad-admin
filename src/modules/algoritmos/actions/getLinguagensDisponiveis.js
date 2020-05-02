import { createSlice } from '@reduxjs/toolkit';

const getLinguagensDisponiveisSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getLinguagensDisponiveisRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getLinguagensDisponiveisSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getLinguagensDisponiveisFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const {
    getLinguagensDisponiveisFalha,
    getLinguagensDisponiveisRequest,
    getLinguagensDisponiveisSucesso
} = getLinguagensDisponiveisSlice.actions;
export default getLinguagensDisponiveisSlice.reducer;