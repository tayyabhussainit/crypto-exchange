import { useEffect } from "react";
import Button from 'react-bootstrap/Button'
import { FaCoins, FaDollarSign } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { coinTransferAction } from './actions/actions'
import { useNavigate } from 'react-router-dom'
function Coin({ coin, rates }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const transferCoin = (event, coin) => {
        event.preventDefault();
        dispatch(coinTransferAction(coin))
        navigate('/coins-transfer')
    }
    return (
        <>
            <tr>
                <td>
                    {coin.id}
                    {/* {<FaCoins />} */}
                </td>
                <td>
                    {coin.name}
                </td>
                <td>
                    {coin.count}
                </td>
                <td>
                    {rates[coin.id]}
                    {<FaDollarSign />}
                </td>
                <td>
                    <Button disabled={!coin.count} onClick={(event) => transferCoin(event, coin)}>Transfer</Button>
                </td>
            </tr>
        </>
    );
}
export default Coin;