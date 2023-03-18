import mongoose from "mongoose"
import UserModel, { IUser } from "../models/UserModel"

export interface IUserRepository {
  getUserByCPF(cpf: string): Promise<IUser | null>
}

class UserRepository implements IUserRepository {
  constructor(connection: string) {
    mongoose.connect(connection)
  }

  async getUserByCPF(cpf: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ cpf })
    return user
  }
}

export default UserRepository
