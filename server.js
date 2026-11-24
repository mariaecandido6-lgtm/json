import express from "express";

import {
    lerMensagens,
    salvarMensagens
} from "./store.js";

const app = express();
const PORTA = 3000;

// EXERCÍCIO 3.2 - ROTA GET /mensagens
app.get("/mensagens", async (req, res) => {
    try {
        const mensagens = await lerMensagens();
        res.json(mensagens);
    } catch (erro) {
        res.status(500).json({
            erro: "Erro na leitura"
        });
    }
});

// ROTA DE TESTE - /exemplo-salvar
app.get("/exemplo-salvar", async (req, res) => {
    try {
        const lista = await lerMensagens();
        lista.push({
            id: Date.now(),
            usuario: "Aluno",
            texto: "Mensagem gravada no disco!"
        });
        await salvarMensagens(lista);
        res.json({
            gravado: true,
            total: lista.length
        });
    } catch (erro) {
        res.status(500).json({
            erro: "Falha ao gravar"
        });
    }
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});