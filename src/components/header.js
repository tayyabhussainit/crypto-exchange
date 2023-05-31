import { Outlet, Link } from "react-router-dom";
function Header({ loggedInUser, LogoutUser }) {

    const Logout = () => {
        LogoutUser()
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Crypto Exchange</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {loggedInUser && <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>}
                        {!loggedInUser && <li className="nav-item">
                            <Link className="nav-link" to="/signin">SignIn</Link>
                        </li>}
                        {!loggedInUser && <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>}
                        {loggedInUser && <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={Logout}>logout ({loggedInUser.email})</Link>
                        </li>}
                        {!loggedInUser && <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>}
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;