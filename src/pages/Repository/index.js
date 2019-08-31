import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import Proptypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueStatus, NextButton } from './style';

// eslint-disable-next-line react/prop-types
export default function Repository({ match }) {
  const [repository, setRespository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'All', page: 1 });

  const statusIssue = ['All', 'Open', 'Closed'];

  useEffect(() => {
    async function fetchReposData() {
      const repoName = decodeURIComponent(match.params.repository);

      const [repo, issuesRepo] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filters.status.toLowerCase(),
            per_page: 5,
            page: filters.page,
          },
        }),
      ]);

      setRespository(repo.data);
      setIssues(issuesRepo.data);
      setLoading(false);
    }
    fetchReposData();
    // eslint-disable-next-line react/prop-types
  }, [filters.page, filters.status, match.params.repository]);

  if (loading) {
    return <Loading>Carregando</Loading>;
  }

  const handleChangeStatus = e => {
    const { page } = filters;
    setFilters({ status: e.target.value, page });
  };

  const handleNextPage = () => {
    const { status, page } = filters;
    setFilters({ status, page: page + 1 });
  };

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositorios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueStatus>
        <p>Issue Status</p>
        <select onChange={e => handleChangeStatus(e)}>
          {statusIssue.map(status => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </IssueStatus>
      <IssueList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url} target="blank">
                  {issue.title}
                </a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
      <NextButton onClick={() => handleNextPage()}>
        Proxima Pagina
        <FaChevronRight />
      </NextButton>
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
