import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './style';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Like didMount
  useEffect(() => {
    const repos = localStorage.getItem('repositories');

    if (repos) {
      setRepositories(JSON.parse(repos));
    }
  }, []);

  // Like didUpdate
  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = e => setNewRepo(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      const repoExists = repositories.find(
        element => element.name === data.name
      );

      if (repoExists) {
        toast.warn('Repositorio ja cadastrado');
        setNewRepo('');
        setLoading(false);
        return;
      }

      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch (err) {
      if (err.response.status === 404) {
        toast.error('Repositorio nao encontrado');
      } else {
        toast.error('Erro ao procurar repositorio');
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repository
      </h1>

      <Form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Adicionar repositorio"
          value={newRepo}
          onChange={e => handleInputChange(e)}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}
