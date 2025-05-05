import { CategoriaContextProvider } from "./CategoriaContext";
import Tabela from "./Tabela";
import Formulario from "./Formulario";


export default function Categorias() {
  return (
    <CategoriaContextProvider>
        <Tabela />
        <Formulario/>
    </CategoriaContextProvider>

  );
}