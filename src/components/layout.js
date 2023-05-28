import Header from './header'

function Layout({ loggedInUser, LogoutUserMain }) {
    const LogoutUser = () => {
        LogoutUserMain()
    }
    return (
        <Header loggedInUser={loggedInUser} LogoutUser={LogoutUser} />
    );
}

export default Layout;