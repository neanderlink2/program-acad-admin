import { createSlice } from '@reduxjs/toolkit';

const getAlgoritmosSlice = createSlice({
    name: 'algoritmos',
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
        getAlgoritmosRequest: (state) => {
            state.isRequesting = true;
            state.hasFinished = false;
        },
        getAlgoritmosSucesso: (state, action) => {
            state.isRequesting = false;
            state.hasFinished = true;
            state.successPayload = action.payload;
            state.errors = [];
        },
        getAlgoritmosFalha: (state, action) => {
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

export const { getAlgoritmosFalha, getAlgoritmosRequest, getAlgoritmosSucesso } = getAlgoritmosSlice.actions;
export default getAlgoritmosSlice.reducer;