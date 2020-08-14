import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_BASE_API } from '../../../api';
import { useFetch } from '../../../components/hooks';
import { LoadingData } from '../../../components/loading-data';
import { PaginatedGrid } from '../../../components/paginated-grid';
import GridUsuarioPontos from './GridUsuario';

export default function TabPontuacao() {
    const [pagina, setPagina] = useState(0);
    const [busca, setBusca] = useState('');
    const { idTurma } = useParams();
    const { response, isLoading, error } = useFetch(`${URL_BASE_API}/v1/turmas/${idTurma}/pontuacao?busca=${busca}&pageIndex=${pagina}`);

    return (
        <div>
            <TextField
                fullWidth
                variant="outlined"
                value={busca}
                onChange={({ target }) => setBusca(target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
            />
            <p style={{ textAlign: 'right' }}>Máximo de {response?.maximoPontos} pontos</p>
            {isLoading ?
                <LoadingData
                    message="Buscando usuários inscritos..."
                />
                : (
                    <PaginatedGrid isLoading={isLoading}
                        pagedList={response.inscritos}
                        itemsNotFoundLabel="Nenhum usuário foi encontrado..."
                        onPageChange={(index) => setPagina(index)}
                        renderItem={(usuario) => (
                            <GridUsuarioPontos
                                nomeAluno={usuario.nomeUsuario}
                                nickname={usuario.nickname}
                                qtdePontos={usuario.qtdePontos}
                                maximoPontos={response.maximoPontos}
                            />
                        )}
                    />
                )}
        </div>
    )
}
