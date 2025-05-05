import { Categoria } from "@/bd/entities/Categoria";

export const getCategoriasAPI = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected/categoria`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data = await response.json()
    return data;
}

export const getCategoriaPorCodigoAPI = async (codigo : number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected/categoria/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCategoriaPorCodigoAPI = async (codigo : number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected/categoria/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCategoriaAPI = async (objeto : Categoria, metodo : string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected/categoria`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}