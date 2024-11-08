import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

interface Entry {
  id: number;
  content: string;
}

const UpdateEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [isDecrypted, setIsDecrypted] = useState(false); 

  useEffect(() => {
    const entries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
    const entry = entries.find((entry) => entry.id === Number(id));

    if (entry) {
      if (!isDecrypted) {
        const enteredPassword = prompt('Please enter your password to decrypt the message:');
        if (enteredPassword) {
          try {
            const bytes = CryptoJS.AES.decrypt(entry.content, enteredPassword);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedText) {
              throw new Error('Incorrect password');
            }

            setMessage(decryptedText);
            setPassword(enteredPassword); 
            setIsDecrypted(true);
          } catch {
            setError('Incorrect password. Unable to decrypt the message.');
          }
        }
      }
    } else {
      setError('Entry not found');
    }
  }, [id, isDecrypted]);

  const handleSave = () => {
    if (!password) {
      alert('Please provide a password to encrypt the message');
      return;
    }

    const encryptedText = CryptoJS.AES.encrypt(message, password).toString();

    const entries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
    const updatedEntries = entries.map((entry) =>
      entry.id === Number(id) ? { ...entry, content: encryptedText } : entry
    );
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    alert('Entry updated and encrypted!');
    navigate('/entries'); 
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Update Entry</h1>
      <textarea
        placeholder="Update your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password for re-encryption"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UpdateEntry;