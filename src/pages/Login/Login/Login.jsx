import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProviders';
import { FaGoogle } from 'react-icons/fa';
import useTitle from '../../../utilities/useTitle';

const Login = () => {
    useTitle()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signIn, signInWithProvider } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    //console.log('login page location', location)
    const from = location.state?.from?.pathname || '/home'

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User login successful.');
                setError('');
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }
    const handleGoogleSignIn = () => {

        signInWithProvider('google')
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setSuccess('User login successful.');
                setError('');
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleGithubSignIn = () => {
        signInWithProvider('github')
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User login successful.');
                setError('');
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Best place to Buy World class legos</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                <div className='mt-6 text-secondary-focus'>
                                    Don't Have an Account?  <Link className='link link-hover text-blue-700' to="/register">Register</Link>
                                </div>
                                <p className='mt-6 text-error'>{error}</p>
                                <p className='mt-6 text-success'>{success}</p>
                            </form>
                            <div className='flex flex-col md:flex-row gap-2'>  
                                <button onClick={handleGoogleSignIn} className='btn btn-outline'> <FaGoogle className='mr-2'></FaGoogle> Google Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;