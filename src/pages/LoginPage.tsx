import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'votre_mot_de_passe') { 
      navigate('/write'); 
    } else {
      alert('Mot de passe incorrect');
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <h2>mot de passe = votre_mot_de_passe</h2>
      <input
        type="password"
        placeholder="Entrez votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginPage;