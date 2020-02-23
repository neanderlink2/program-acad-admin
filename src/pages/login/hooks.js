import { firebaseErrorCodes } from '../../configs/firebaseConfig';
import { useEffect } from 'react';
import { useSnackbars } from '../../components/hooks/index';
import { useHistory } from 'react-router-dom';

export function useUserLoginFailed(code, cleanUp) {
    const { info, warning, error: snackError } = useSnackbars();

    useEffect(() => {
        if (code) {
            switch (code) {
                case firebaseErrorCodes.NOT_FOUND:
                    warning("Usuário ainda não cadastrado.");
                    break;
                case firebaseErrorCodes.WRONG_PASSWORD:
                    warning("Usuário ou senha estão incorretos.");
                    break;
                case firebaseErrorCodes.INVALID_EMAIL:
                    warning("E-mail digitado é inválido.");
                    break;
                case firebaseErrorCodes.ACCOUNT_EXISTING:
                    warning("Opa, esse e-mail está sendo utilizado em uma conta vinculada a outra rede social.");
                    break;
                case firebaseErrorCodes.POPUP_CLOSED:
                    break;
                default:
                    snackError("Houve um problema de conexão com o servidor de autenticação.");
                    break;
            }

            cleanUp();
        }
    }, [code, cleanUp, snackError, info, warning]);
}

export function useUserLoginSuccess(user) {
    const history = useHistory();
    const { info, warning } = useSnackbars();

    useEffect(() => {
        if (user) {
            history.push('/');
            info(`Bem-vindo à Program.Acad, Prof. ${user.displayName}!`);
        }
    }, [user, info, warning, history]);
}