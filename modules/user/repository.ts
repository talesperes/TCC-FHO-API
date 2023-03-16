import mongoose from "mongoose";
import User from "./model";

interface UserData {
  nome: string;
  cpf: string;
  cep: string;
  celular: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface IUserRepository {
  createUser(data: UserData): Promise<UserData>;
}

class UserRepository {
  constructor(connectionString: any) {
    mongoose.connect(connectionString);
  }

  async createUser(data: UserData) {
    const user = new User(data);
    return user.save();
  }
}

export default UserRepository;
