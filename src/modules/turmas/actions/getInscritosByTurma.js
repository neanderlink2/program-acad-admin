import { createSlice } from '@reduxjs/toolkit';

const getInscritosByTurmaSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getInscritosByTurmaRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getInscritosByTurmaSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getInscritosByTurmaFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const { getInscritosByTurmaFalha, getInscritosByTurmaRequest, getInscritosByTurmaSucesso } = getInscritosByTurmaSlice.actions;
export default getInscritosByTurmaSlice.reducer;