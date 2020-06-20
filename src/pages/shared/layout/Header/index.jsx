import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { AccountCircle, ExitToApp, Menu as MenuIcon } from '@material-ui/icons';
import { usePopupState } from 'material-ui-popup-state/hooks';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserLogin } from '../../../../components/hooks/index';
import { signOut } from '../../../../configs/firebaseConfig';
import { useAsideMenu } from '../../../../modules/aside-menu/hooks';
import { useWindowWidth } from './hooks';
import { BotaoTopo, TituloTopo } from './styles';

const Header = () => {
    const history = useHistory();
    const { user, userClaims } = useUserLogin();
    const width = useWindowWidth();
    const { showMenu } = useAsideMenu();
    return (
        <AppBar>
            <Toolbar>
                {
                    width <= 650 &&
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={showMenu}>
                        <MenuIcon />
                    </IconButton>
                }
                <TituloTopo variant="h6" onClick={() => history.push('/')}>Administração da Program.Acad</TituloTopo>
                {
                    width > 650 ?
                        user && userClaims && (
                            <AuthenticatedMenu userName={userClaims.name} signOut={() => signOut()} />
                        )
                        :
                        null
                }
            </Toolbar>
        </AppBar>
    )
}

const AuthenticatedMenu = ({ userName, signOut }) => {
    const popupState = usePopupState({ variant: 'popover', popupId: 'user-menu' });
    const history = useHistory();

    function deslogar() {
        signOut()
            .then(() => {
                popupState.close();
                history.push("/");
            });
    }

    return (
        <Fragment>
            <BotaoTopo variant="text" startIcon={<AccountCircle />} onClick={() => { }}>Prof. {userName}</BotaoTopo>
            <BotaoTopo variant="text" startIcon={<ExitToApp />} onClick={deslogar}>Sair</BotaoTopo>
        </Fragment>
    )
}

export default Header;