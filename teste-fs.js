import { mkdir, writeFile, readFile } from "node:fs/promises";

// EXERCÍCIO 2.1 - SALVANDO HISTÓRICO
async function salvarHistorico() {
    const lista = [
        {
            id: 1,
            usuario: "Maria",
            texto: "Primeira mensagem!"
        },
        {
            id: 2,
            usuario: "João",
            texto: "Segunda mensagem!"
        }
    ];
    await mkdir(new URL("./data/", import.meta.url), {
        recursive: true
    });
    const caminhoArquivo = new URL(
        "./data/mensagens-teste.json",
        import.meta.url
    );
    await writeFile(
        caminhoArquivo,
        JSON.stringify(lista, null, 2),
        "utf8"
    );
    console.log("Histórico salvo com sucesso!");
}

// EXERCÍCIO 2.2 - LEITURA SEGURA
async function lerDadosSeguros(nomeArquivo) {
    try {
        const conteudo = await readFile(nomeArquivo, "utf8");
        const dados = JSON.parse(conteudo);
        return dados;
    } catch (erro) {
        if (erro.code === "ENOENT") {
            return [];
        }
        throw erro;
    }
}

// EXECUTANDO OS TESTES
async function executarTestes() {
    await salvarHistorico();
    const dados = await lerDadosSeguros(
        new URL("./data/arquivo-fantasma.json", import.meta.url)
    );
    console.log("Resultado com arquivo ausente:", dados);
}
executarTestes();       