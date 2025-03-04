import { Request, Response, RequestHandler } from "express";
import QRCode from "../models/QRCode";
import Vehicle from "../models/Vehicle";
import QRCodeGenerator from "qrcode"; // Librairie pour générer les QR codes



/** 
 * @desc Générer un QR Code pour un véhicule
 * @route POST /qrcodes
 */
export const generateQRCode: RequestHandler = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    if (!vehicleId) {
      res.status(400).json({ error: "L'ID du véhicule est requis" });
      return;
    }

    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      res.status(404).json({ error: "Véhicule introuvable" });
      return;
    }

    const qrCodeData = `${process.env.FRONTEND_URL}/scan/${vehicleId}`;
    const qrCodeImage = await QRCodeGenerator.toDataURL(qrCodeData);

    const newQRCode = await QRCode.create({
      vehicleId,
      qrCodeData: qrCodeImage,
    });

    res.status(201).json(newQRCode);
  } catch (error) {
    console.error("Erreur lors de la génération du QR Code :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/** 
 * @desc Récupérer un QR Code par son `vehicleId`
 * @route GET /qrcodes/vehicle/:vehicleId
 */
export const getQRCodeByVehicle: RequestHandler = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    if (!vehicleId) {
      res.status(400).json({ error: "ID du véhicule requis" });
      return;
    }

    const qrCode = await QRCode.findOne({ where: { vehicleId } });

    if (!qrCode) {
      res.status(404).json({ error: "QR Code introuvable pour ce véhicule" });
      return;
    }

    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Erreur lors de la récupération du QR Code :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

/** 
 * @desc Récupérer un QR Code par son `id`
 * @route GET /qrcodes/:id
 */
export const getQRCodeById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID de QR Code manquant" });
      return;
    }

    const qrCode = await QRCode.findByPk(id);

    if (!qrCode) {
      res.status(404).json({ error: "QR Code introuvable" });
      return;
    }

    res.status(200).json(qrCode);
  } catch (error) {
    console.error("Erreur lors de la récupération du QR Code :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};