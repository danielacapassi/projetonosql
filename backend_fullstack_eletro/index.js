import cors from "cors";
import express from "express";
import mysql from "mysql";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

var app = express();
app.use(express.json());
app.use(cors());

// //Model de Comentario
// const ComentarioSchema = new Schema({
//   nome: {
//     type: String,
//   },
//   msg: {
//     type: String,
//   },
//   data: {
//     type: Date,
//     default: new Date(),
//   },
// });

// const comentarios = model("comentarios", ComentarioSchema);

// Conexao com o Banco SQL

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "recode",
});

//Conexão com o MongoDb

const connectionMongo = () => {
  mongoose
    .connect("mongodb://localhost/fullstackelectro", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB conectou com sucesso");
    })
    .catch((error) => {
      console.log(error);
    });
};

connectionMongo(); 


app.get("/pedidos/", function (req, res) {
  connection.query("SELECT * from pedidos", (error, result) => {
    console.log(result);
    res.json(result);
  });
});

app.get("/pedidos/:id", function (req, res) {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM pedidos INNER JOIN cliente ON pedidos.id_cliente=cliente.id_cliente INNER JOIN produtos ON pedidos.idproduto=produtos.idproduto where cliente.id_cliente = ${id}`,
    (error, result) => {
      res.json(result);
    }
  );
});

// Get em MongoDb

app.get("/comentarios/", async (req, res) => {
  const resultado = await comentarios.find();
  res.json(resultado);
});

// Post em MongoDb

app.post("/comentarios", async (req, res) => {
  const { nome, msg } = req.body;
  let resultado = await comentarios.create({ nome, msg });
  res.json(resultado);
});

app.get("/produtos/", function (req, res) {
  connection.query("SELECT * from produtos", (error, result) => {
    console.log(result);
    res.json(result);
  });
});

app.get("/produtos/:index", function (req, res) {
  const { index } = req.params;
  res.json(produtos[index]);
});

app.post("/produtos/", function (req, res) {
  const item = req.body;
  produtos.push(item);
  res.json(item);
});

app.listen(3333, function () {});
