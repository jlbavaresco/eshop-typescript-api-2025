import { Usuario } from "@/bd/entities/Usuario";
import { pool } from "../config";

const autenticaUsuarioDB = async (email : string, senha : string): Promise<Usuario> => {
    try {
        console.log('Email: ' + email + " Senha: " + senha)
        const results = await pool.query(`SELECT * FROM usuarios 
            WHERE email = $1 AND senha = $2`, [email, senha]);
        if (results.rowCount == 0){
            throw "Usuário ou senha inválidos";
        }
        const usuario = results.rows[0];
        return {email: usuario.email, tipo: usuario.tipo, telefone: usuario.telefone, nome: usuario.nome};
    } catch(err){
        throw "Erro ao autenticar o usuário: " + err;
    }
};

export {
    autenticaUsuarioDB
};