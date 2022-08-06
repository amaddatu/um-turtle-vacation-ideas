import { useMutation } from '@apollo/client';

const LoginForm = () => {
  const onFormSubmit = async(event) => {
    event.preventDefault();
    console.log("working");
  }
  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="email-label">Email</span>
        <input type="text" className="form-control" placeholder="Email" ariaLabel="Email" ariaDescribedby="email-label" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="password-label">Password</span>
        <input type="password" className="form-control" placeholder="Password" ariaLabel="Password" ariaDescribedby="password-label" />
      </div>
    </form>
  );
};

export default LoginForm;
