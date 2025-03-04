import { Request, Response } from "express";
import User from "../models/User";

// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

// Créer un utilisateur
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email et mot de passe sont requis" });
      return;
    }

    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    await user.update({ email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};
