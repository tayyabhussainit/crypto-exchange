import rates from './rates'
import Coin from './Coin'
import { Table } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function CoinListing() {
    const loggedInUser = useSelector((state) => {
        return state.UserReducer.loggedInUser
    });

    const navigate = useNavigate()
    useEffect(() => {
        console.log(loggedInUser);
        if (!loggedInUser) {
            navigate('/signin')
        }
    }, []);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Rate</th>
                        <th>Transfer</th>
                    </tr>
                </thead>
                <tbody>
                    {loggedInUser?.coins.map((coin) => <Coin key={coin.id} coin={coin} rates={rates} />)}
                </tbody>
            </Table>
        </>
    );
}
export default CoinListing;