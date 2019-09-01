import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Proptypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueStatus,
  Footer,
  Button,
} from './style';

export default function Repository({ match }) {
  const [repository, setRespository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'All',
    currentPage: 1,
    lastPage: 1,
  });

  const perPage = 10;
  const statusIssue = ['All', 'Open', 'Closed'];

  useEffect(() => {
    async function fetchReposData() {
      const repoName = decodeURIComponent(match.params.repository);

      const [repo, issuesRepo] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filters.status.toLowerCase(),
            per_page: perPage,
            page: filters.currentPage,
          },
        }),
      ]);

      setRespository(repo.data);
      setIssues(issuesRepo.data);
      setLoading(false);
    }
    fetchReposData();
  }, [filters.currentPage, match.params.repository]);

  useEffect(() => {
    const repoName = decodeURIComponent(match.params.repository);
    async function getAllPages() {
      const allIssues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.status.toLowerCase(),
        },
      });

      setFilters({
        status: filters.status,
        currentPage: filters.currentPage,
        lastPage: Math.ceil(allIssues.data.length / perPage),
      });
    }

    getAllPages();
  }, [filters.status]);

  if (loading) {
    return <Loading>Carregando</Loading>;
  }

  const handleChangeStatus = e => {
    setFilters({ status: e.target.value, currentPage: 1 });
  };

  const handleNextPage = () => {
    const { status, currentPage, lastPage } = filters;
    if (currentPage !== lastPage) {
      setFilters({ status, currentPage: currentPage + 1, lastPage });
    }
  };

  const handlePrevPage = () => {
    const { status, currentPage, lastPage } = filters;
    if (currentPage > 1) {
      setFilters({ status, currentPage: currentPage - 1, lastPage });
    }
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
        {issues.length > 0 ? (
          issues.map(issue => (
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
          ))
        ) : (
          <h1>Acabou</h1>
        )}
      </IssueList>
      <Footer>
        <Button
          disabled={filters.currentPage === 1 ? 1 : 0}
          onClick={() => handlePrevPage()}
        >
          <FaChevronLeft />
          Proxima Pagina
        </Button>
        <Button
          disabled={filters.currentPage === filters.lastPage}
          onClick={() => handleNextPage()}
        >
          Proxima Pagina
          <FaChevronRight />
        </Button>
      </Footer>
    </Container>
  );
}

Repository.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.isRequired,
  }).isRequired,
};
