import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './style';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => setNewRepo(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    setRepositories([...repositories, data]);
    setNewRepo('');
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

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
