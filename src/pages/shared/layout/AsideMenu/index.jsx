import { Button, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { AccountCircle, ArrowBack, People, Person } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserLogin } from '../../../../components/hooks/index';
import { signOut } from '../../../../configs/firebaseConfig';
import { useAsideMenu } from '../../../../modules/aside-menu/hooks';
import { TopAsideMenu } from './styles';

export const AsideMenu = () => {
    const { userClaims } = useUserLogin();
    const history = useHistory();
    const { showingAsideMenu, showMenu, hideMenu } = useAsideMenu();
    const [userName, setUserName] = useState('');
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        if (userClaims) {
            setUserName(userClaims.name);
            setUserNickname(userClaims.nickname);
        }
    }, [userClaims]);

    const imageStyle = userClaims && userClaims.picture ? { backgroundImage: `url(${userClaims.picture}) ` } : { backgroundColor: '#d2d2d2' };
    return (
        <SwipeableDrawer
            open={showingAsideMenu}
            onClose={hideMenu}
            onOpen={showMenu}
        >
            <TopAsideMenu style={{ ...imageStyle }}>
                <h3>{userName}</h3>
                <span>{userNickname}</span>
                {
                    !userClaims &&
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button color="primary" onClick={() => {
                            history.push("/login");
                            hideMenu();

                        }}>Entrar</Button>
                        <Button variant="contained" color="secondary" onClick={() => {
                            history.push("/cadastro");
                            hideMenu();
                        }}>Começar agora</Button>
                    </div>
                }
            </TopAsideMenu>
            <Divider />
            {
                userClaims ?
                    <>
                        <section style={{ flex: 1 }}>
                            <List>
                                <ListItem disabled>Minhas informações</ListItem>
                                <ListItem button onClick={() => {
                                    history.push("/conta");
                                    hideMenu();
                                }}>
                                    <ListItemIcon><AccountCircle /></ListItemIcon>
                                    <ListItemText primary="Conta" />
                                </ListItem>
                                <ListItem button onClick={() => {
                                    history.push("/turmas");
                                    hideMenu();
                                }}>
                                    <ListItemIcon><People /></ListItemIcon>
                                    <ListItemText primary="Turmas inscritas" />
                                </ListItem>
                            </List>
                        </section>
                        <Divider />
                        <List>
                            <ListItem button onClick={() => {
                                signOut();
                                hideMenu();
                                history.push("/");
                            }}>
                                <ListItemIcon><ArrowBack /></ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItem>
                        </List>
                    </>
                    :
                    <List>
                        <ListItem disabled>Menu</ListItem>
                        <ListItem button onClick={() => {
                            hideMenu();
                            history.push("/");
                        }}>
                            <ListItemIcon><Person /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </List>
            }

        </SwipeableDrawer>
    )
}