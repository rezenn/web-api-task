import {
  CreateUserDTO,
  GetUserByIdDTO,
  GetUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
} from "../dtos/user.dto";
import {
  IUserRepository,
  UserRepository,
} from "../repositories/user.repositories";
import { User } from "../types/user.types";

let userRepository: IUserRepository = new UserRepository();

export class UserService {
  getAllUsers(): User[] {
    let response: User[] = userRepository.getAllUser().map((user: User) => {
      return { ...user, username: user.username, email: user.email };
    });
    return response;
  }

  getUserById(id: string): User | undefined {
    return userRepository.getUserById(id);
  }

  createUser(userDTO: CreateUserDTO): User {
    const newUser: User = {
      id: userDTO.id,
      username: userDTO.username,
      name: userDTO.name,
      email: userDTO.email,
      age: userDTO.age,
    };
    let existingUser = userRepository.getUserById?.(newUser.id);
    if (existingUser) {
      throw new Error(`${newUser.id} already exists.`);
    }
    return userRepository.createUser(newUser);
  }

  deleteUser(id: string): User {
    const DeleteUser = userRepository.deleteUser(id);
    if (!DeleteUser) {
      throw new Error(`User with id ${id} not found.`);
    }
    return DeleteUser;
  }

  updateUser(userDTO: UpdateUserDTO): User {
    const updateUser = userRepository.updateUser(userDTO.id, {
      username: userDTO.username,
      name: userDTO.name,
      email: userDTO.email,
      age: userDTO.age,
    });
    if (!updateUser) {
      throw new Error(`User with id ${userDTO.id} not found.`);
    }
    return updateUser;
  }
}
