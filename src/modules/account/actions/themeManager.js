import { createSlice } from '@reduxjs/toolkit';

const themeManagerSlice = createSlice({
    name: 'account',
    initialState: {
        isDarkMode: false,
        corPrincipal: ''
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload.isDarkMode;
        },
        setCorPrincipal: (state, action) => {
            state.corPrincipal = action.payload.corPrincipal;
        }
    }
});

export const { setDarkMode, setCorPrincipal } = themeManagerSlice.actions;
export default themeManagerSlice.reducer;