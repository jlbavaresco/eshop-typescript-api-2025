'use client'
import Spinner from 'react-bootstrap/Spinner';
import { FunctionComponent, ReactNode } from "react";

interface CarregandoProps {
    carregando: boolean,
    children?: ReactNode
}

const Carregando: FunctionComponent<CarregandoProps> = ({ carregando, children }) => {
    return (
        <>
            {
                !carregando ? children :
                    <div className="d-flex align-items-center m-5">
                        <strong role="status">Carregando...</strong>
                        <Spinner animation="border" size="sm" variant="primary" />
                        <Spinner animation="border" variant="primary" />
                    </div>
            }
        </>
    )
}

export default Carregando;