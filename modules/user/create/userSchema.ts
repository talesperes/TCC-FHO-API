import * as yup from "yup";

export const userSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  cep: yup.string().required("CEP é obrigatório"),
  celular: yup.string().required("Celular é obrigatório"),
  endereco: yup.string().required("Endereço é obrigatório"),
  numero: yup.string().required("Número é obrigatório"),
  complemento: yup.string().required("Complemento é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  estado: yup.string().required("Estado é obrigatório"),
});
