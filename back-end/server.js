const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;
const mongoURL = "mongodb://localhost:27017"; // MongoDB URL
const dbName = "users";


app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve static files like images from the 'uploads' folder

let db;

// Connect to MongoDB
MongoClient.connect(mongoURL)
  .then((client) => {
    console.log("✅ Connected to MongoDB");
    db = client.db(dbName);
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Multer setup for file uploads (profile picture)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to create unique file names
  },
});

//signup
app.post('/signup', async (req, res) => {
    const { name, lastName, email, password, departement } = req.body;
  
    console.log('Nouvel utilisateur :', { name, lastName, email, password, departement });
  
    try {
      // Vérifie si l'utilisateur existe déjà
      const existingUser = await db.collection("users").findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "Email déjà utilisé !" });
      }
  
      // Ajout du nouvel utilisateur
      await db.collection("users").insertOne({
        name,
        lastName,
        email,
        password,
        departement,
        role: "user",
        statusCompte: "pending",
        photo: null
      });
  
      res.status(201).json({ message: "Inscription réussie !" });
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error);
      res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
  });
  
  
// Handle the login POST request
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
// Définir l'URL de redirection en fonction du rôle de l'utilisateur
let redirectTo = "back.html"; // Redirection par défaut
if (user.role === "admin") {
  redirectTo = "/admin/dashboard"; // Si l'utilisateur est admin
}

    return res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        role: user.role,
        email: user.email,
        departement: user.departement,
        photo: user.photo, // Send the photo URL
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
 
});
// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
  
// Get admin users
app.get("/users", async (req, res) => {
    try {
      const users = await db.collection("users").find().toArray();
      res.status(200).json(users);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });
  

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression." });
  }
});

// Update user
app.put("/users/:id", async (req, res) => {
  try {
    const { name, lastName, email, departement } = req.body;
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, lastName, email, departement } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

