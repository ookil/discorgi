import { gql, useMutation } from '@apollo/client';
import { isLoggedInVar } from '../cache';
import SignupForm from '../components/auth/SignupForm';

const SIGNUP_USER = gql`
  mutation SignupUser($signupUserData: UserCreateInput!) {
    signupUser(data: $signupUserData) {
      token
    }
  }
`;

const Signup = () => {
  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: ({ signupUser: user }) => {
      sessionStorage.setItem('token', user.token);
      isLoggedInVar(true);
    },
  });

  if (loading) return <p>Loading</p>;

  return <SignupForm signupUser={signupUser} error={error} />;
};

export default Signup;
