import { SHOW_MENU, HIDE_MENU } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../configs/middlewares';

export const useAsideMenu = () => {
    const dispatch = useDispatch();
    const showingAsideMenu = useSelector((states) => states.asideMenu.showAsideMenu);

    function showMenu() {
        dispatch({ type: SHOW_MENU });
    }

    function hideMenu() {
        dispatch({ type: HIDE_MENU });
    }

    return { showingAsideMenu, showMenu, hideMenu };
}