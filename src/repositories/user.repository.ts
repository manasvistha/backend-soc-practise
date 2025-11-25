import { User } from "../types/user.type";

let users: User[] = [
  { id: "user1", username: "Manasvi shrestha", email: "manasvi@example.com", name: "John Doe", age: 30 },
  { id: "user2", username: "hululu", email: "hululu@example.com", name: "Jane Smith", age: 25 },
];

export const userRepository = {
  findAll(): User[] {
    return users;
  },

  findById(id: string): User | undefined {
    return users.find(u => u.id === id);
  },

  findByEmail(email: string): User | undefined {
    return users.find(u => u.email === email);
  },

  findByUsername(username: string): User | undefined {
    return users.find(u => u.username === username);
  },

  create(user: User): User {
    users.push(user);
    return user;
  },

  update(id: string, data: Partial<User>): User | null {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data };
    return users[index];
  },

  delete(id: string): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  },
};