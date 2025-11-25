import { z } from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserSchema = UserSchema.pick({
  id: true,
  username: true,
  email: true,
  name: true,
  age: true, 
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;


export const UpdateUserSchema = UserSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;