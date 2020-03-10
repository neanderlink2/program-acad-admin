import { createSlice } from '@reduxjs/toolkit';

const authHandlerSlice = createSlice({
    name: 'account',
    initialState: {
        user: undefined,
        token: '',
        verificouAutenticacao: false
    },
    reducers: {
        storeUser: (state, action) => {            
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.verificouAutenticacao = true;
        },
        removeUser: (state) => {
            state.user = undefined;
            state.token = '';
            state.verificouAutenticacao = true;
        }
    }
});

export const { storeUser, removeUser } = authHandlerSlice.actions;
export default authHandlerSlice.reducer;