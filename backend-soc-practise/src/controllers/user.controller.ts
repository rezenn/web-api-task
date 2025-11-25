import { Request, Response } from "express";
import { User } from "../types/user.types";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";

let userService: UserService = new UserService();

export class UserController {
  createUser = (req: Request, res: Response) => {
    try {
      const vaildation = CreateUserDTO.safeParse(req.body);
      if (!vaildation.success) {
        return res.status(400).json({ errors: vaildation.error });
      }

      const { id, username, name, email, age } = vaildation.data;
      const newUser: User = userService.createUser({
        id,
        username,
        name,
        email,
        age,
      });
      return res.status(201).json(newUser);
    } catch (error: Error | any) {
      return res.status(400).send(error.message ?? "something went wrong");
    }
  };

  getUser = (req: Request, res: Response) => {
    try {
      const users: User[] = userService.getAllUsers();
      return res.status(201).json(users);
    } catch (error: Error | any) {
      return res.status(400).send(error.message ?? "something went wrong");
    }
  };

  getUserById = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const foundUser = userService.getUserById(userId);

      if (!foundUser) {
        return res.status(404).json(`${userId} not found.`);
      }
      return res.status(201).json(foundUser);
    } catch (error: Error | any) {
      return res.status(400).send(error.message ?? "something went wrong");
    }
  };

  updateUser = (req: Request, res: Response) => {
    try {
      const vaildation = UpdateUserDTO.safeParse(req.body);
      if (!vaildation.success) {
        return res.status(400).json({ errors: vaildation.error });
      }

      const { id, username, name, email, age } = vaildation.data;
      const updateUser: User = userService.updateUser({
        id,
        username,
        name,
        email,
        age,
      });
      return res.status(201).json(updateUser);
    } catch (error: Error | any) {
      return res.status(400).send(error.message ?? "something went wrong");
    }
  };

  deleteUser = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const deleteUser = userService.deleteUser(userId);

      if (!deleteUser) {
        return res.status(404).json(`${userId} not found.`);
      }
      return res.status(201).json(`${userId} user deleted.`);
    } catch (error: Error | any) {
      return res.status(400).send(error.message ?? "something went wrong");
    }
  };
}
