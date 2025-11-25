import { userRepository } from "../repositories/user.repository";
import { User } from "../types/user.type";

export const userService = {
  getUsers(): User[] {
    return userRepository.findAll();
  },

  getUser(id: string): User | undefined {
    return userRepository.findById(id);
  },

  createUser(data: User): User {
    const { id, username, email, name } = data;

    if (!id || !username || !email || !name) {
      throw { status: 400, message: "Id, username, email, and name are required" };
    }

    if (userRepository.findById(id)) throw { status: 409, message: "User ID already exists" };
    if (userRepository.findByEmail(email)) throw { status: 409, message: "Email already exists" };
    if (userRepository.findByUsername(username)) throw { status: 409, message: "Username already exists" };

    return userRepository.create(data);
  },

  updateUser(id: string, data: Partial<User>): User {
    const { username, email, name } = data;

    if (!username || !email || !name) throw { status: 400, message: "Username, email, and name are required" };

    const existing = userRepository.findById(id);
    if (!existing) throw { status: 404, message: "User not found" };

    if (userRepository.findByEmail(email) && existing.email !== email) throw { status: 409, message: "Email already exists" };
    if (userRepository.findByUsername(username) && existing.username !== username) throw { status: 409, message: "Username already exists" };

    const updated = userRepository.update(id, data);
    if (!updated) throw { status: 500, message: "Failed to update user" };
    return updated;
  },

  deleteUser(id: string) {
    const deleted = userRepository.delete(id);
    if (!deleted) throw { status: 404, message: "User not found" };
  }
};