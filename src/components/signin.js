import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import CustomAlert from './alert'
import { useNavigate } from 'react-router-dom'
import '../css/signin.css'
import { useDispatch } from 'react-redux';
import {initAction} from '../coin/actions/actions'
function SignIn({ updateRetries, setLoggedInUserFun, matchPassword, emailExists, users }) {
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");
        if (email === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Please provide email');
            return;
        }
        const user = emailExists(email);
        if (user.length == 0) {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Wrong email');
            return;
        }

        if (password === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Please provide password');
            return;
        }
        if (user[0].retries === 3) {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('User Blocked');
            return;
        }
        const passwordMatch = matchPassword(email, password);
        if (passwordMatch.length == 0) {
            updateRetries(email)
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Wrong Password');
            return;
        }
        setAlert(true);
        setAlertType('info');
        setAlertMessage('Signed IN');
        setLoggedInUserFun(user[0])
        dispatch(initAction(user[0], users))
        navigate('/dashboard')
    }
    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                    <div className="panel border bg-white">
                        <div className="panel-heading">
                            <h3 className="pt-3 font-weight-bold">Login</h3>
                            {alert && <CustomAlert alertType={alertType} alertMessage={alertMessage} />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                        <div className="panel-body p-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default SignIn;