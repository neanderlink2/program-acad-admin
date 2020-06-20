import { createSlice } from '@reduxjs/toolkit';

const getAlgoritmoPorIdSlice = createSlice({
    name: 'algoritmos',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: [],
        errors: []
    },
    reducers: {
        getAlgoritmoPorIdRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getAlgoritmoPorIdSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getAlgoritmoPorIdFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = [];
            state.errors = action.payload;
        },
    }
});

export const {
    getAlgoritmoPorIdFalha,
    getAlgoritmoPorIdRequest,
    getAlgoritmoPorIdSucesso
} = getAlgoritmoPorIdSlice.actions;
export default getAlgoritmoPorIdSlice.reducer;