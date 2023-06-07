
const initialState = {
    users: null,
    loggedInUser: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_COINS':
            const transfer_to = parseInt(action.payload.transfer_to);
            const coinsToTransfer = parseInt(action.payload.coins);
            let sUsers = [...state.users];
            const sLoggedInUser = { ...state.loggedInUser };
            const sCoin = { ...state.coin };
            const senderUserIndex = sUsers.findIndex(user => user.id === sLoggedInUser.id);
            if (senderUserIndex > -1) {
                const senderUser = { ...sUsers[senderUserIndex] }
                const coinIndex = senderUser.coins.findIndex(coin => coin.id === sCoin.id);
                if (coinIndex > -1) {
                    const senderUserCoins = [...senderUser.coins]
                    senderUserCoins[coinIndex] = {
                        ...senderUserCoins[coinIndex],
                        count: senderUserCoins[coinIndex].count - coinsToTransfer
                    }
                    senderUser.coins = senderUserCoins;
                }
                sUsers[senderUserIndex] = senderUser;
            }

            const rcvrUserIndex = sUsers.findIndex(user => user.id === transfer_to);
            if (rcvrUserIndex > -1) {
                const rcvrUser = { ...sUsers[rcvrUserIndex] }
                const coinIndex = rcvrUser.coins.findIndex(coin => coin.id === sCoin.id);
                const rcvrUserCoins = [...rcvrUser.coins]
                if (coinIndex > -1) {
                    rcvrUserCoins[coinIndex] = {
                        ...rcvrUserCoins[coinIndex],
                        count: rcvrUserCoins[coinIndex].count + coinsToTransfer
                    }
                } else {
                    const newCoin = {
                        id: rcvrUser.coins.length + 1,
                        name: sCoin.name,
                        count: coinsToTransfer 
                    }
                    rcvrUserCoins.push(newCoin)
                }
                rcvrUser.coins = rcvrUserCoins
                sUsers[rcvrUserIndex] = rcvrUser;
            }

            console.log('here');

            return {
                ...state,
                loggedInUser: sUsers[senderUserIndex],
                users: sUsers
            };
        case 'INIT':
            return {
                ...state,
                users: action.payload.users,
                loggedInUser: action.payload.loggedInUser,
            };
        case 'COIN_TRANSFER':
            return {
                ...state,
                coin: action.payload?.coin
            }
        default:
            return state;
    }
}

export default userReducer;