import { Request, Response, RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/** 
 * @desc Inscription d'un nouvel utilisateur
 * @route POST /auth/register
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    // Validation des entrées
    await body("email").isEmail().withMessage("Email invalide").run(req);
    await body("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "Cet email est déjà utilisé" });
      return;
    }

    // Créer un nouvel utilisateur
    const user = await User.create({ email, password });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/** 
 * @desc Connexion d'un utilisateur
 * @route POST /auth/login
 */
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ error: "Identifiants invalides" });
      return;
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Identifiants invalides" });
      return;
    }

    // Générer le token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
