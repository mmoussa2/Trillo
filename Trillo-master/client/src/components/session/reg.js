import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { REGISTER_USER } from '../../graphql/mutations';

// This component is not currently working
// DO NOT USE

function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);

  function handleSubmit(e) {
    e.preventDefault();
    registerUser({ variables: { email, name, password }})
  }

  return (
    <div>
      <form
        onSubmit={e => handleSubmit()}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Register;