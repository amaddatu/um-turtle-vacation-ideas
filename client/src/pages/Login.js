import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import LoginForm from '../components/LoginForm';
import {QUERY_ME} from '../utils/queries';

const Login = () => {
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const me = data?.me || {};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Login</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            { me.hasOwnProperty("_id") ? (
              <ul className="square">
                  {/*logged in */}
                    <li>{me.name} is logged in</li>  
                    <li>email: {me.email}</li>
              </ul>
            ) : (
              <>{/*Not Logged in - need form*/}
                <LoginForm />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
