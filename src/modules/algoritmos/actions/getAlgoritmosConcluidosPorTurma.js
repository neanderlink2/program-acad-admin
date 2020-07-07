import { createSlice } from '@reduxjs/toolkit';

const getAlgoritmosConcluidosPorTurmaSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getAlgoritmosConcluidosPorTurmaRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getAlgoritmosConcluidosPorTurmaSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getAlgoritmosConcluidosPorTurmaFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const {
    getAlgoritmosConcluidosPorTurmaFalha,
    getAlgoritmosConcluidosPorTurmaRequest,
    getAlgoritmosConcluidosPorTurmaSucesso
} = getAlgoritmosConcluidosPorTurmaSlice.actions;
export default getAlgoritmosConcluidosPorTurmaSlice.reducer;