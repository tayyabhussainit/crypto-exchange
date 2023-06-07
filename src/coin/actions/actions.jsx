

export const initAction = (loggedInUser, users) => ({
    type: 'INIT',
    payload: { loggedInUser, users },
});

export const coinTransferAction = (coin) => ({
    type: 'COIN_TRANSFER',
    payload: { coin }
})

export const sendCoinsAction = (transfer_to, coins) => ({
    type: 'SEND_COINS',
    payload: { transfer_to, coins }
})
