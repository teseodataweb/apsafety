import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Iniciando sesión con:", email, password);
        // Aquí va la lógica real de login
    };

    return (
        <section className="login-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">Acceder</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
