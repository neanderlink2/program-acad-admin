import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { storeUser } from '../../modules/account/actions/authHandler';

export const useDocumentTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);
}

export const useSnackbars = () => {
    const { enqueueSnackbar } = useSnackbar();
    return {
        default(message) {
            return enqueueSnackbar(message, { variant: 'default' });
        },
        success(message) {
            return enqueueSnackbar(message, { variant: 'success' });
        },
        warning(message) {
            return enqueueSnackbar(message, { variant: 'warning' });
        },
        error(message) {
            return enqueueSnackbar(message, { variant: 'error' });
        },
        info(message) {
            return enqueueSnackbar(message, { variant: 'info' });
        }
    }
}

export const useUserLogin = () => {
    const user = useSelector((states) => states.account.auth.user);

    const [userClaims, setUserClaims] = useState(null);
    const [token, setToken] = useState('');
    const [isPrimeiroAcesso, setIsPrimeiroAcesso] = useState(null);

    useEffect(() => {
        if (user) {
            user.getIdTokenResult(true)
                .then((result) => {
                    setUserClaims(result.claims);
                    setToken(result.token);
                    setIsPrimeiroAcesso(!Boolean(result.claims.nickname));
                });
        }
        return () => {
            setToken('');
            setIsPrimeiroAcesso(null);
        }
    }, [user]);

    const atualizarUsuario = () => {
        if (user) {
            storeUser({ user: user, token })
        }
    }

    return { userClaims, user, token, isPrimeiroAcesso, atualizarUsuario };
}

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}