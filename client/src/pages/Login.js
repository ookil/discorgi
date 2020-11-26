import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { isLoggedInVar } from '../cache';
import LoginForm from '../components/auth/LoginForm';

const LOGIN_USER = gql`
  mutation LoginUser($loginUserData: UserCreateInput!) {
    loginUser(data: $loginUserData) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser: user }) {
      localStorage.setItem('token', user.token);
      isLoggedInVar(true);
      history.push('/channels/welcome/1');
    },
  });

  if (loading) return <p>Loading</p>;

  return <LoginForm loginUser={loginUser} error={error} />;
};

export default Login;
