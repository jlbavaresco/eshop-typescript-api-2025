import { NextRequest, NextResponse } from "next/server";
import { getCategoriaPorCodigoDB, deleteCategoriaDB } from "@/bd/useCases/categoriaUseCases";

export async function GET(request: NextRequest, context: { params: Promise<{ codigo: string }> }) {
    try {
        const { codigo } = await context.params;
        const categoria = await getCategoriaPorCodigoDB(Number(codigo));
        return NextResponse.json(categoria, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'error', message: "Erro: " + err },
            { status: 404 }
        );
    }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ codigo: string }> }) {
    try {
        const { codigo } = await context.params;
        const resultado = await deleteCategoriaDB(Number(codigo));
        return NextResponse.json({ status: "success", message: resultado }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { status: 'error', message: "Erro: " + err },
            { status: 404 }
        );
    }
}