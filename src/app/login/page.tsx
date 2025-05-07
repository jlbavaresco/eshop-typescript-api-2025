'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Carregando from '@/componentes/Carregando';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErroLogin(false);
        setCarregando(true);
        const res = await signIn('credentials', {
            email,
            senha,
            redirect: false,
        });
        setCarregando(false);

        if (!res || !res.ok) {
            setErroLogin(true);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div style={{ textAlign: 'center' }}>
                    <h2>Login de Usuário</h2>
                </div>
                {erroLogin && (
                    <h4 className="text-center" style={{ color: 'red' }}>
                        Falha ao efetuar o login. Usuário ou senha inválidos.
                    </h4>
                )}
                <Carregando carregando={carregando}>
                    <div className="col-12 col-md-6">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="txtEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Informe o email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="txtSenha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="form-group text-center mt-3">
                                <Button variant="primary" type="submit">
                                    Efetuar Login
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Carregando>
            </div>
        </div>
    );
}
