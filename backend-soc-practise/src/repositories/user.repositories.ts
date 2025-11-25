import { User } from "../types/user.types";

// In-memory storage -
let users: any[] = [
  {
    id: "user1",
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    age: 30,
  },
  {
    id: "user2",
    username: "jane_smith",
    email: "jane@example.com",
    name: "Jane Smith",
    age: 25,
  },
];

export interface IUserRepository {
  getAllUser(): User[];
  getUserById(id: string): User | undefined;
  createUser(user: User): User;
  updateUser(id: string, updateData: Partial<User>): User | undefined;
  deleteUser(id: string): User | undefined;
}

export class UserRepository implements IUserRepository {
  getAllUser(): User[] {
    return users;
  }
  getUserById(id: string): User | undefined {
    return users.find((user) => user.id == id);
  }
  createUser(user: User): User {
    users.push(user);
    return user;
  }
  updateUser(id: string, updateData: Partial<User>): User | undefined {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    users[index] = { ...users[index], ...updateData };
    return users[index];
  }
  
  deleteUser(id: string): User | undefined {
    const user = users.find((user) => user.id === id);
    if (!user) return undefined;
    users = users.filter((user) => user.id !== id);
    return user;
  }
}
