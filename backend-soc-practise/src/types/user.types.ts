import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  username: z.string().min(2, { message: "Username is required" }),
  email: z.email(),
  name: z.string().min(2),
  age: z.number().min(0),
});

export type User = z.infer<typeof UserSchema>;

export type UserDocument = User & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
