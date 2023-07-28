import { useState } from 'react';
import useToken from './jwtdauth.tsx';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../actions/userAction.js';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const accountData = {
            email: email,
            first_name: first,
            last_name: last,
            password: password,
            zipcode: '12345',
            picture_url:
                'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
            follower_list: [],
            following_list: [],
            pets: [],
            hosted_events: [],
            attending_events: [],
        };

        await register(
            accountData,
            `${process.env.REACT_APP_API_HOST}/api/accounts`
        )
            .then(() => {
                setTimeout(() => {
                    dispatch(fetchUser());
                    navigate('/home');
                }, 1000);
            })

            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Signup</h5>
            <div className="card-body">
                <form onSubmit={(e) => handleRegistration(e)}>
                    <div className="mb-3">
                        <label className="form-label">email</label>
                        <input
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">confirm password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">first</label>
                        <input
                            name="first"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setFirst(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">last</label>
                        <input
                            name="last"
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                                setLast(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
