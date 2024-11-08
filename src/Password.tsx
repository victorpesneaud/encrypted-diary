import React, { useState } from 'react';

interface PasswordProps {
  onSubmitPassword: (password: string) => void;
}

const Password: React.FC<PasswordProps> = ({ onSubmitPassword }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmitPassword(password); 
  };

  return (
    <div>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit Password</button>
    </div>
  );
};

export default Password;