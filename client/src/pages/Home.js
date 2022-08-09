import React, {useEffect, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useUser } from '../context/UserContext';
import reducer from '../context/reducers';
import {LOGIN, LOGOUT} from '../context/actions';

const Home = () => {
  const initialState = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data } = useQuery(QUERY_MATCHUPS, {
    fetchPolicy: "no-cache"
  });

  const matchupList = data?.matchups || [];
  const logout = (event) =>{
    event.preventDefault();

    Auth.logout(dispatch);
  }

  

  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const me = dataMe?.me || {};

  useEffect( () => {
    if(me && me.hasOwnProperty("_id")){
      if(state.user === null || me._id !== state.user._id ){
        dispatch({type: LOGIN, payload: me});
      }
    }
  }); // want to update state on any change
  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to Tech Matchup!</h1>
        <Link to="/login">{ state.logged_in ? "Profile" : "Login" }</Link><br />
        <a href="/logout" onClick={logout}>Logout</a>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of matchups you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {matchupList.map((matchup) => {
              return (
                <li key={matchup._id}>
                  <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                    {matchup.tech1} vs. {matchup.tech2}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new matchup?</h2>
        <Link to="/matchup">
          <button className="btn btn-lg btn-danger">Create Matchup!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
