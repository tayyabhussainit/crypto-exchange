import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown'
import CustomAlert from '../components/alert'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../css/signin.css'
import { useDispatch, useSelector } from 'react-redux';
import {sendCoinsAction} from './actions/actions'

function CoinTransfer() {

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const dispatch = useDispatch()
    const state = useSelector((state) => {
        return state.UserReducer
    });

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const transfer_to = formData.get("transfer_to");
        const coins = formData.get("coins");
        dispatch(sendCoinsAction(transfer_to, coins))
        setAlert(true);
        setAlertType('info');
        setAlertMessage('Coin Trasnfered');
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                        <div className="panel border bg-white">
                            <div className="panel-heading">
                                <h3 className="pt-3 font-weight-bold">Transfer Coins ( {state && state.coin.name} )</h3>
                                {alert && <CustomAlert alertType={alertType} alertMessage={alertMessage} />}
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Transfer To</Form.Label>
                                        <Form.Control as="select" name="transfer_to">
                                            {state.users?.map((user, i) => {
                                                if (user.id !== state.loggedInUser.id) {
                                                    return <option value={user.id}>
                                                        {user.email}
                                                    </option>
                                                }
                                            }
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Coin to Transfer</Form.Label>
                                        <Form.Control as="select" name="coins">

                                            {[...Array(state.coin.count)].map((e, i) =>
                                                <option value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            )}
                                        </Form.Control>
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

        </>
    );

}

export default CoinTransfer;