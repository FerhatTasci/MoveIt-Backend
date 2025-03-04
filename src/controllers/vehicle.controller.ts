import { Request, Response } from "express";
import Vehicle from "../models/Vehicle";
import User from "../models/User";

// Récupérer tous les véhicules
export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await Vehicle.findAll({ include: [User] });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des véhicules" });
  }
};

// Créer un véhicule
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { plate, userId } = req.body;

    if (!plate || !userId) {
      res.status(400).json({ error: "Numéro de plaque et userId requis" });
      return;
    }

    const newVehicle = await Vehicle.create({ plate, userId });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du véhicule" });
  }
};

// Récupérer un véhicule par ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id, { include: [User] });

    if (!vehicle) {
      res.status(404).json({ error: "Véhicule non trouvé" });
      return;
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du véhicule" });
  }
};

// Mettre à jour un véhicule
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { plate, userId } = req.body;
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      res.status(404).json({ error: "Véhicule non trouvé" });
      return;
    }

    await vehicle.update({ plate, userId });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du véhicule" });
  }
};

// Supprimer un véhicule
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      res.status(404).json({ error: "Véhicule non trouvé" });
      return;
    }

    await vehicle.destroy();
    res.status(200).json({ message: "Véhicule supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du véhicule" });
  }
};
