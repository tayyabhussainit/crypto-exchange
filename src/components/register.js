import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import CustomAlert from './alert'

function Register(props) {
    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const newUserHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");
        const cnic = formData.get("cnic");
        const address = formData.get("address");
        if (email === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Please provide email');
            return;
        }
        const user = props.emailExists(email)
        if (user.length > 0) {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('email already exists');
            return;
        }
        if (name === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Please provide name');
            return;
        }
        if (password === '') {
            setAlert(true);
            setAlertType('danger');
            setAlertMessage('Please provide password');
            return;
        }
        setAlert(true);
        setAlertType('info');
        setAlertMessage('User Registered, Please login');
        props.addNewUser(
            {
                "email": email,
                "password": password,
                "name": name,
                "cnic": cnic,
                "address": address,
                "blocked": false,
                "retries": 0
            });
    }

    return (

        <div class="container">
            <div class="row">
                <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                    <div class="panel border bg-white">
                        <div class="panel-heading">
                            <h3 class="pt-3 font-weight-bold">Register</h3>
                            {alert && <CustomAlert alertType={alertType} alertMessage={alertMessage} />}
                            <Form onSubmit={newUserHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="textarea" name="address" placeholder="address" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCnic">
                                    <Form.Label>CNIC</Form.Label>
                                    <Form.Control type="file" name="cnic" placeholder="CNIC" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;