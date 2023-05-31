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
function App() {

  const [users, setUsers] = useState([
    {
      "email": "tayyab.sarfraz@systemsltd.com",
      "password": "password",
      "retries": 0,
      "blocked": false,
      "address": "Lahore",
      "cnic": "tayyab.pdf"
    },
    {
      "email": "mohsin.abbas@systemsltd.com",
      "password": "password",
      "retries": 0,
      "blocked": false,
      "address": "Lahore",
      "cnic": "mohsin.pdf"
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
      <Routes>
        <Route path="/" element={<Layout loggedInUser={loggedInUser} LogoutUserMain={LogoutUserMain} />}>
          <Route path="signin" element={<SignIn updateRetries={updateRetries} emailExists={emailExists} matchPassword={matchPassword} setLoggedInUserFun={setLoggedInUserFun} />} />
          <Route path="register" element={<Register addNewUser={newUser} emailExists={emailExists} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<BlogListing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
