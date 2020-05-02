import * as Yup from 'yup';

export const algoritmoFormSchema = Yup.object().shape({
    idTurma: Yup
        .string()
        .required('Identificador da turma não encontrado.')
        .default(''),
    dataCriacao: Yup
        .date()
        .min(new Date(), 'A data de criação precisa ser igual à data de hoje.'),
    titulo: Yup
        .string()
        .min(3, 'O título do algoritmo deve possuir no mínimo 3 caracteres.')
        .max(100, 'O título do algoritmo deve possuir no máximo 100 caracteres.'),
    htmlDescricao: Yup
        .string()
        .min(20, 'A descrição do algoritmo deve possuir no mínimo 20 caracteres.'),
    nivelDificuldade: Yup
        .number()
        .min(1, 'Selecione um nível de dificuldade')
        .typeError('Selecione um nível de dificuldade'),
    linguagensPermitidas: Yup
        .array()
        .of(Yup.string().min(1, 'Linguagem inválida.'))
        .min(1, 'Marque pelo menos uma linguagem de programação.'),
    casosTeste: Yup
        .array()
        .of(Yup.object().shape({
            entradaEsperada: Yup.array().of(Yup.string()),
            saidaEsperada: Yup.array().of(Yup.string().min(1, 'Digite uma saída.')),
            tempoMaximoExecucao: Yup.number().min(1, 'O tempo mínimo de execução é 1 seg.')
        }))
        .min(1, 'Crie pelo menos um teste.'),
});