import { gql, useMutation } from '@apollo/client';
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
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ loginUser: user }) {
      localStorage.setItem('token', user.token);
      isLoggedInVar(true);
    },
  });

  if (loading) return <p>Loading</p>;

  

  return <LoginForm loginUser={loginUser} error={error} />;
};

export default Login;
