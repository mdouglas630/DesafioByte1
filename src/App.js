import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

const API_URL = 'https://api.github.com/users/mdouglas630';

const UserProfile = ({ user }) => {
  const { login, public_repos } = user;

  return (
    <div>
      <h2>{login}</h2>
      <p>Repositórios: {public_repos}</p>
    </div>
  );
};

const Repositories = ({ repos }) => {
  return (
    <div>
      <h2>Repositórios</h2>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setUser(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchRepos = async () => {
        const result = await axios(user.repos_url);
        setRepos(result.data);
      };

      fetchRepos();
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div>
          <UserProfile user={user} />
          <Repositories repos={repos} />
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
