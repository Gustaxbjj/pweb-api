import { expect } from "chai";
import { sequelize, db } from "./setup.js";

describe("Testes da Tabela CanalFilme 🎬", () => {
  let canal, filme;

  beforeEach(async () => {
    // Limpa o banco e recria as tabelas
    await sequelize.sync({ force: true });

    // Cria um canal de teste
    canal = await db.Canal.create({
      nome: "Canal Prime",
      descricao: "Canal de filmes e séries",
      genero_tema: 'aventura',
      data_criacao: new Date(),
    });

    // Cria um filme de teste
    filme = await db.Filme.create({
      titulo: "Matrix Revolutions",
      genero: "Ação",
      duracao: 130,
      ano_lancamento: 2003,
      nota_avaliacao: 7.1,
    });
  });

  it("Deve criar um registro em CanalFilme com os IDs corretos ✅", async () => {
    const canalFilme = await db.CanalFilme.create({
      id_canal: canal.id,
      id_filme: filme.id,
      nome: "Sessão Matrix",
    });

    expect(canalFilme).to.have.property("id");
    expect(canalFilme.id_canal).to.equal(canal.id);
    expect(canalFilme.id_filme).to.equal(filme.id);
    expect(canalFilme.nome).to.equal("Sessão Matrix");
  });

  it("Deve retornar os dados corretamente a partir de CanalFilme 🔍", async () => {
    const canalFilmeCriado = await db.CanalFilme.create({
      id_canal: canal.id,
      id_filme: filme.id,
      nome: "Sessão Noturna",
    });

    const encontrado = await db.CanalFilme.findByPk(canalFilmeCriado.id);

    expect(encontrado).to.not.be.null;
    expect(encontrado.id_canal).to.equal(canal.id);
    expect(encontrado.id_filme).to.equal(filme.id);
    expect(encontrado.nome).to.equal("Sessão Noturna");
  });

  it("não pode nulo burro 🚫", async () => {
    try {
      await db.CanalFilme.create({
        id_filme: filme.id,
        nome: "Erro de Canal",
      });
    } catch (error) {
      expect(error.name).to.equal("SequelizeValidationError");
    }
  });

  it("burro 🚫", async () => {
    try {
      await db.CanalFilme.create({
        id_canal: canal.id,
        id_filme: 9999, // ID inválido
        nome: "Erro de Filme",
      });
    } catch (error) {
      expect(error.name).to.satisfy(name => name.includes("Sequelize") || name.includes("ForeignKey"));
    }
  });
});
