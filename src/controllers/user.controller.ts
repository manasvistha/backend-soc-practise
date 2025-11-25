import { Request, Response } from "express";
import { userService } from "../services/user.services";

export const userController = {
  getAll(req: Request, res: Response) {
    return res.json(userService.getUsers());
  },

  getOne(req: Request, res: Response) {
    const user = userService.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  },

  create(req: Request, res: Response) {
    try {
      const newUser = userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  },

  update(req: Request, res: Response) {
    try {
      const updated = userService.updateUser(req.params.id, req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  },

  delete(req: Request, res: Response) {
    try {
      userService.deleteUser(req.params.id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
};