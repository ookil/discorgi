import { useQuery, gql } from '@apollo/client';

const GET_USER_SERVERS = gql`
  query getUserServers {
    userServers {
      id
      name
    }
  }
`;

const ServerList = () => {
  const { loading, error, data } = useQuery(GET_USER_SERVERS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;
console.log(data);

const content = data.userServers.map(({ id, name }) => (
    <div key={id}>
      {id}: {name}
    </div> ))

  return (
      <div>
          {content}

      </div>
  )
};

export default ServerList;
