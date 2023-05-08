import mongoose from "mongoose";
import UserModel, { IUser } from "../models/UserModel";

export interface IUserRepository {
  createUser(data: IUser): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  getUserByCPF(cpf: string): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
  updateUser(id: string, data: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<IUser | null>;
}

class UserRepository implements IUserRepository {
  constructor(connection: string) {
    mongoose.connect(connection);
  }

  async createUser(data: IUser): Promise<IUser> {
    const user = new UserModel(data);
    await user.save();
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
    return user;
  }

  async getUserByCPF(cpf: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ cpf });
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const user = await UserModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return user;
  }

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await UserModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, {
      runValidators: true,
      new: true,
    });
    return user;
  }
}

export default UserRepository;
