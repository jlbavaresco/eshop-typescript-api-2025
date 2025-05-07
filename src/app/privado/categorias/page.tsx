import { CategoriaContextProvider } from "./CategoriaContext";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";
import { redirect } from "next/navigation";


export default async function Categorias() {

  const session = await getServerSession(authOptions);

  if (!session) {
      redirect("/api/auth/signin");
  }
  return (
    <CategoriaContextProvider>
        <Tabela />
        <Formulario/>
    </CategoriaContextProvider>

  );
}