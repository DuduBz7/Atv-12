import { Router } from "express";
const router = Router();

import {
    selectUsuario,
    selectUsuarios,
    insertUsuario,
    deleteUsuario,
    updateUsuario,
  } from "../db/index.js";

router.get("/usuarios", async (req, res) => {
    console.log("Rota GET/usuarios solicitada");
    try {
      const usuarios = await selectUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  
  router.get("/usuario/:id", async (req, res) => {
    console.log("Rota GET /usuario solicitada");
    try {
      const usuario = await selectUsuario(req.params.id);
      if (usuario.length > 0) res.json(usuario);
      else res.status(404).json({ message: "Usuário não encontrado!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  router.use(express.json());
  
  
  router.post("/usuario", async (req, res) => {
    console.log("Rota POST /usuario solicitada");
    try {
      await insertUsuario(req.body);
      res.status(201).json({ message: "Usuário inserido com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  
  //index.js
  router.delete("/usuario/:id", async (req, res) => {
    console.log("Rota DELETE /usuario solicitada");
    try {
      const usuario = await selectUsuario(req.params.id);
      if (usuario.length > 0) {
        await deleteUsuario(req.params.id);
        res.status(200).json({ message: "Usuário excluido com sucesso!!" });
      } else res.status(404).json({ message: "Usuário não encontrado!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  router.listen(port, () => {            // Um socket para "escutar" as requisições
    console.log(`Serviço escutando na porta:  ${port}`);
  });
  
  //index.js
  router.patch("/usuario", async (req, res) => {
    console.log("Rota PATCH /usuario solicitada");
    try {
      const usuario = await selectUsuario(req.body.id);
      if (usuario.length > 0) {
        await updateUsuario(req.body);
        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
      } else res.status(404).json({ message: "Usuário não encontrado!" });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
  });
  export default router;