import { createSlice } from '@reduxjs/toolkit';

const getTurmasByInstrutorSlice = createSlice({
    name: 'turmas',
    initialState: {
        isRequesting: false,
        hasFinished: false,
        successPayload: {
            "totalPages": 0,
            "pageIndex": 0,
            "items": [],
            "hasNextPage": false,
            "hasPreviousPage": false,
            "totalItems": 0
        },
        errors: []
    },
    reducers: {
        getTurmasByInstrutorRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getTurmasByInstrutorSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getTurmasByInstrutorFalha: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = {
                "totalPages": 0,
                "pageIndex": 0,
                "items": [],
                "hasNextPage": false,
                "hasPreviousPage": false,
                "totalItems": 0
            };
            state.errors = action.payload;
        },
    }
});

export const { getTurmasByInstrutorRequest, getTurmasByInstrutorSucesso, getTurmasByInstrutorFalha } = getTurmasByInstrutorSlice.actions;
export default getTurmasByInstrutorSlice.reducer;