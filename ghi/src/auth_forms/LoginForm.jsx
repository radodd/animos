import useToken from '@galvanize-inc/jwtdown-for-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../actions/userAction.js';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //   const baseUrl = process.env.REACT_APP_API_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password)
            .then(() => {
                setTimeout(() => {
                    dispatch(fetchUser());
                    navigate('/home');
                }, 1000);
            })

            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
