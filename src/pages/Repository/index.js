import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner } from './style';

// eslint-disable-next-line react/prop-types
export default function Repository({ match }) {
  const [repository, setRespository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReposData() {
      // eslint-disable-next-line react/prop-types
      const repoName = decodeURIComponent(match.params.repository);

      const [repo, issuesRepo] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRespository(repo.data);
      setIssues(issuesRepo.data);
      setLoading(false);
    }
    fetchReposData();
  }, []);

  if (loading) {
    return <Loading>Carregando</Loading>;
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositorios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
    </Container>
  );
}

Repository.prototype = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      repository: Proptypes.string,
    }),
  }).isRequired,
};
