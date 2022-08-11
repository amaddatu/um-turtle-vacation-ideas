import React, {useState, useReducer} from 'react';

export default function UserForm(props){
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    "name-finished": false,
    "email-finished": false,
    "password-finished": false,
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
      ...formState,
      [name]: value
    });
  }
  const submitHandler = (event) => {
    alert(JSON.stringify(formState));
  }
  return (
    <form onSubmit={submitHandler}>
      Hi my name is &nbsp;
      {formState["name-finished"] ? (
        <>{formState.name}</>
      ) : (
        
        <input 
          type="text"
          name="name"
          value={formState.name}
          onChange={onChangeHandler}
        />
      )}
      
      .

      <input
        type="checkbox"
        name="name-finished"
        checked={formState["name-finished"]}
        onChange={() => onChangeHandler( {
            target: {
              name: "name-finished",
              value: !formState["name-finished"]
            }
        })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}