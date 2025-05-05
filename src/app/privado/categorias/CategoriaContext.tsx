'use client'
import { Alerta } from '@/componentes/AlertaInterface';
import { Categoria } from '@/bd/entities/Categoria';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getCategoriasAPI, deleteCategoriaPorCodigoAPI, getCategoriaPorCodigoAPI, cadastraCategoriaAPI, } from '@/clientesServicoAPI/ClienteCategoriaAPI';

export interface CategoriaContextType {
    listaObjetos: Categoria[];
    alerta: Alerta;
    remover: (codigo: number) => void;
    carregando : boolean;
    objeto: Categoria;
    editarObjeto: (codigo: number) => void;
    acaoCadastrar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    novoObjeto: () => void;
    exibirForm: boolean;
    setExibirForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

export default CategoriaContext;

export const CategoriaContextProvider = ({ children }: { children: ReactNode }) => {

    const [alerta, setAlerta] = useState<Alerta>({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState<Categoria[]>([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaCategorias = async () => {
        setCarregando(true);
        setListaObjetos(await getCategoriasAPI());
        setCarregando(false);
    }

    const remover = async (codigo: number) => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteCategoriaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaCategorias();
        }
    }

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState<Categoria>({
        codigo: 0,
        nome: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
        });
        setExibirForm(true);
    }

    const editarObjeto = async (codigo: number) => {
        setObjeto(await getCategoriaPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaCategorias();
    }


    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
    };


    useEffect(() => {
        recuperaCategorias();
    }, []);


    return (
        <CategoriaContext.Provider value={{
            listaObjetos, alerta, remover, carregando, objeto, editarObjeto,
            acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
        }}>
            {children}
        </CategoriaContext.Provider>
    );
};

export const useCategoriaContext = (): CategoriaContextType => {
    const context = useContext(CategoriaContext);
    if (context === undefined) {
        throw new Error('Contexto não encontrado');
    }
    return context;
};