import React, { Fragment } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle, Assignment, People, ExitToApp } from '@material-ui/icons';
import { BotaoTopo, TituloTopo } from './styles';
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import { useHistory } from 'react-router-dom';
import { useUserData } from '../../../../components/hooks/index';
import { signOut } from '../../../../configs/firebaseConfig';
import { useWindowWidth } from './hooks';
import { useAsideMenu } from '../../../../modules/aside-menu/hooks';

const Header = () => {
    const history = useHistory();
    const { user, userClaims } = useUserData();
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