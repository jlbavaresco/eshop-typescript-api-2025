import { Categoria } from "@/bd/entities/Categoria";
import { pool } from "../config";


const getCategoriasDB = async (): Promise<Categoria[]> => {
    try {
        const { rows } = await pool.query(`SELECT * FROM categorias ORDER BY nome`);
        return rows.map((categoria: Categoria) => ({
            codigo: categoria.codigo,
            nome: categoria.nome
        }));
    } catch (err) {
        throw "Erro: " + err;
    }
};

const addCategoriaDB = async (objeto: Categoria): Promise<Categoria> => {
    try {
        const { nome } = objeto;
        const results = await pool.query(`
            INSERT INTO categorias (nome) 
            VALUES ($1)
            RETURNING codigo, nome
        `, [nome]);

        const categoria = results.rows[0];
        return {
            codigo: categoria.codigo,
            nome: categoria.nome
        };
    } catch (err) {
        throw "Erro ao inserir a categoria: " + err;
    }
};

const updateCategoriaDB = async (objeto: Categoria): Promise<Categoria> => {
    try {
        const { codigo, nome } = objeto;
        const results = await pool.query(`
            UPDATE categorias SET nome = $2 WHERE codigo = $1 
            RETURNING codigo, nome
        `, [codigo, nome]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const categoria = results.rows[0];
        return {
            codigo: categoria.codigo,
            nome: categoria.nome
        };
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }
};

const deleteCategoriaDB = async (codigo: number): Promise<string> => {
    try {
        const results = await pool.query(`DELETE FROM categorias WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        }
        return `Categoria de código ${codigo} removida com sucesso!`;
    } catch (err) {
        throw "Erro ao remover a categoria: " + err;
    }
};

const getCategoriaPorCodigoDB = async (codigo: number): Promise<Categoria> => {
    try {
        const results = await pool.query(`SELECT * FROM categorias WHERE codigo = $1`, [codigo]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        }

        const categoria = results.rows[0];
        return {
            codigo: categoria.codigo,
            nome: categoria.nome
        };
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }
};

export {
    getCategoriasDB,
    addCategoriaDB,
    updateCategoriaDB,
    deleteCategoriaDB,
    getCategoriaPorCodigoDB
};