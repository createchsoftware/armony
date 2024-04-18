const express = require("express");

const routerUser = express.Router();

// USER
// CREATE
app.get("/api/admin/user/create", (req, res) => {
  createUser(
    pool,
    {
      email: "a21490545@itmexicali.edu.mx",
      telefono: "686456789",
      pass: "contra",
      tipo: 1,
    },
    (result) => {
      res.json(result);
    }
  );
});

// READ
app.get("/api/admin/user/read", (req, res) => {
  searchUser(pool, { usuario: 4 }, (result) => {
    console.log("El id es: " + JSON.stringify(result[0]));
    res.json(result);
  });
});
