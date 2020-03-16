import * as Yup from 'yup';
import { parse, isAfter, isBefore } from 'date-fns';

export const turmaFormSchema = Yup.object().shape({
    nomeTurma: Yup.string().min(3, 'O nome da turma deve possuir no mínimo 3 caracteres.').max(75, 'O nome da turma deve possuir no máximo 75 caracteres.').required('Digite um nome para a turma.').default(''),
    capacidadeAlunos: Yup.number().min(5, 'A turma deve permitir no mínimo 5 alunos.').max(200, 'A turma não deve permitir mais de 2000 alunos.').required('Digite a capacidade de alunos nessa turma.').default(0),
    dataTermino: Yup.string().required('Digite uma data de término.')
        .test("is-valid", "Data de término inválida.", function (value) {
            const hora = parse(value, "dd/MM/yyyy", new Date());
            return hora instanceof Date;
        })
        .test("is-greater", "A data de término deve ser maior que a data atual.", function (value) {
            return isAfter(parse(value, "dd/MM/yyyy", new Date()), new Date());
        }),
    horaTermino: Yup.string().required('Digite uma hora de término.')
        .test("is-valid", "Hora inválida.", function (value) {
            const hora = parse(value, "HH:mm", new Date());
            return hora instanceof Date;
        })
});