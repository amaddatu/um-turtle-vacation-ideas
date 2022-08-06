import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const LoginForm = () => {
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onFormSubmit = async(event) => {
    event.preventDefault();
    console.log("working");
  }
  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="email-label">Email</span>
        <input 
          name="email" type="text" className="form-control" placeholder="Email" ariaLabel="Email" ariaDescribedby="email-label" 
          value={formState.email}
          onChange={handleChange}
          />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="password-label">Password</span>
        <input 
          name="password" type="password" className="form-control" placeholder="Password" ariaLabel="Password" ariaDescribedby="password-label" 
          value={formState.password}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default LoginForm;
