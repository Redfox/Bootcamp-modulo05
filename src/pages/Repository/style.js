import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueStatus = styled.div`
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    max-width: 400px;
  }

  select {
    border: none;
    background: #7159c1;
    color: #fff;
    padding: 8px 10px;
    border-radius: 2px;

    option:hover {
      cursor: pointer;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 10px 0;
    padding: 2px;
    border: 0;
    background: #7159c1;
    color: #fff;
    padding: 10px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & + svg {
      margin: 0 0 0 5px;
    }

    svg {
      margin: 0 5px 0 0;
    }
  }
`;

export const Button = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
