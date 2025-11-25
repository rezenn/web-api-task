import { z } from "zod";
import { UserSchema } from "../types/user.types";

const baseUserDTO = UserSchema.pick({
  id: true,
  username: true,
  email: true,
  name: true,
  age: true,
});

export const CreateUserDTO = baseUserDTO;

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const GetUserDTO = baseUserDTO;
export type GetUserDTO = z.infer<typeof CreateUserDTO>;

export const UpdateUserDTO = baseUserDTO;
export type UpdateUserDTO = z.infer<typeof CreateUserDTO>;

export const GetUserByIdDTO = baseUserDTO;
export type GetUserByIdDTO = z.infer<typeof CreateUserDTO>;

export const DeleteUserDTO = baseUserDTO;
export type DeleteUserDTO = z.infer<typeof CreateUserDTO>;
