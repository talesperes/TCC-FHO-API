import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  cep: String,
  celular: String,
  endereco: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  estado: String,
});

export default mongoose.model("User", UserSchema);
