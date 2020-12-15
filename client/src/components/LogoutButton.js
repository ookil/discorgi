import { useApolloClient } from '@apollo/client';
import { isLoggedInVar } from '../cache';

const LogoutButton = () => {
  const client = useApolloClient();

  return (
    <i
      className='fas fa-sign-out-alt'
      title='log-out'
      onClick={async () => {
        sessionStorage.removeItem('token');
        isLoggedInVar(false);
        await client.clearStore();

        window.location.reload(true);
      }}
    />
  );
};

export default LogoutButton;
