const User = require("../../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const express = require("express");
const nodemailer = require("nodemailer");
const { HttpError } = require("../../middlewares/error");

let route = express.Router({ mergeParams: true });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "losc596@gmail.com",
    pass: "tugl ixlt pmzv rkac",
  },
});

route.post("/", async (req, res) => {
  try {
    console.log("Début de la route d'inscription");
    const { email, password } = req.body;
    console.log("Email reçu:", email);

    // Générer un code à 6 chiffres
    const verificationCode = crypto.randomInt(100000, 999999);
    console.log("Code de vérification généré:", verificationCode);

    // Envoyer l'email avec le code
    const mailOptions = {
      from: "votre_email@gmail.com",
      to: email,
      subject: "Code de vérification pour votre inscription",
      html: `
    <h2>Bonjour,</h2>
    <p>Merci de vous être inscrit sur notre plateforme ! Pour finaliser votre inscription, veuillez utiliser le code de vérification ci-dessous :</p>
    <h3 style="color: #4CAF50;">Code de vérification : ${verificationCode}</h3>
    <p>Ce code est valable pendant 24 heures. Si vous ne parvenez pas à vérifier votre compte dans ce délai, vous devrez demander un nouveau code.</p>
    <p>Si vous n'avez pas demandé cette inscription, veuillez ignorer cet email.</p>
    <p>Nous vous remercions pour votre confiance et restons à votre disposition pour toute question.</p>
    <p>Cordialement,<br>L'équipe [Nom de votre entreprise]</p>
  `,
    };

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = new User({
      email,
      password: hashedPassword,
      verificationCode,
      codeExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire dans 24 heures
    });

    await user.save();
    console.log("Utilisateur sauvegardé avec succès");
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès");

    res.status(201).json({
      message: "Utilisateur créé. Vérifiez votre email pour le code.",
    });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    throw new HttpError(500, { message: "Pas d'inscription" });
  }
});

module.exports = route;
