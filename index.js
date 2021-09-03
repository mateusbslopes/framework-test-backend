const express = require("express");

const products = require("./store/producs.json");

const app = express();
const port = 5000;

const authTest = {
  user: "admin@test.com",
  password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", // 123456
  token: "f47eca970cadc1111bb01266d1c7ff8a055bc774d8eb4e73131fc20b4ce685a8", // thisissometoken
};

const ErrorMessages = {
  ptBr: {
    InvalidAuth: "Usuario ou senha inválidos",
    NotFound: "Não encontrado"
  },
};

app.use(require("./router"));

app.post("/authenticate", (req, res) => {
  const { body = {} } = req;
  const { user, password } = body;

  // Set error message based on header lang
  if (!user || !password) {
    res.status(400, ErrorMessages.ptBr.InvalidAuth);
    res.end();
    return;
  }

  if (user !== authTest.user || password !== authTest.password) {
    res.status(404, ErrorMessages.ptBr.InvalidAuth);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.end(JSON.stringify({ token: authTest.token }));
});

app.get("/products", (req, res) => {
  const { search } = req.query;

  const result = products.filter((p) =>
    p.name.toUpperCase().includes(search.toUpperCase())
  );

  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.end(JSON.stringify(result));
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const result = products.find((p) => p.id == id);

  if (!result) {
    res.status(404, ErrorMessages.ptBr.NotFound);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.end(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
