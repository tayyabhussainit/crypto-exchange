import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NoMatch from './components/no-match'
import SignIn from './components/signin';
import { useState, useEffect } from 'react';
import Register from './components/register';
import Dashboard from './components/dashboard';
import BlogListing from './blog/blogs-listing';
import CoinListing from './coin/CoinListing';
import { Provider } from 'react-redux';
import store from './coin/store'
import CoinTransfer from './coin/CoinTransfer'

function App() {

  const [users, setUsers] = useState([
    {
      "id": 1,
      "email": "tayyab.sarfraz@systemsltd.com",
      "password": "asd",
      "retries": 0,
      "blocked": false,
      "address": "Lahore",
      "cnic": "tayyab.pdf",
      "coins": [{ id: 1, name: 'Gold Coin', count: 4 }, { id: 2, name: 'Silvar Coin', count: 3 }, { id: 3, name: 'Copper Coin', count: 5 }, { id: 4, name: 'Platinium Coin', count: 2 }, { id: 5, name: 'Iron Coin', count: 40 }]
    },
    {
      "id": 2,
      "email": "mohsin.abbas@systemsltd.com",
      "password": "password",
      "retries": 0,
      "blocked": false,
      "address": "Lahore",
      "cnic": "mohsin.pdf",
      "coins": [{ id: 1, name: 'Gold Coin', count: 4 }, { id: 2, name: 'Silvar Coin', count: 3 }, { id: 3, name: 'Copper Coin', count: 5 }, { id: 4, name: 'Platinium Coin', count: 2 }, { id: 5, name: 'Iron Coin', count: 40 }]
    },
    {
      "id": 3,
      "email": "abc@systemsltd.com",
      "password": "password",
      "retries": 0,
      "blocked": false,
      "address": "Lahore",
      "cnic": "abc.pdf",
      "coins": [{ id: 1, name: 'Gold Coin', count: 4 }, { id: 2, name: 'Silvar Coin', count: 3 }, { id: 3, name: 'Copper Coin', count: 5 }, { id: 4, name: 'Platinium Coin', count: 2 }, { id: 5, name: 'Iron Coin', count: 40 }]
    }
  ]);

  const [loggedInUser, setLoggedInUser] = useState(null);


  const Click = () => {
    console.log(users);
  }

  const newUser = (user) => {
    setUsers([...users, user])
  }


  const emailExists = (userEmail) => {
    var matches = users.filter((user) => {
      return user.email === userEmail;
    })
    return matches;
  }

  const matchPassword = (email, password) => {
    var matches = users.filter((user) => {
      return (user.email === email && user.password === password);
    })
    return matches;
  }

  const setLoggedInUserFun = (user) => {
    setLoggedInUser(user);
  }
  const updateRetries = (email) => {
    let newUsers = users;
    newUsers.find(user => user.email == email).retries++;
    setUsers(newUsers);
  }

  const LogoutUserMain = () => {
    
    setLoggedInUser(null);
  }

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout loggedInUser={loggedInUser} LogoutUserMain={LogoutUserMain} />}>
            <Route path="signin" element={<SignIn users={users} updateRetries={updateRetries} emailExists={emailExists} matchPassword={matchPassword} setLoggedInUserFun={setLoggedInUserFun} />} />
            <Route path="register" element={<Register addNewUser={newUser} emailExists={emailExists} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<BlogListing />} />
            <Route path="coins" element={<CoinListing />} />
            <Route path="coins-transfer" element={<CoinTransfer />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
