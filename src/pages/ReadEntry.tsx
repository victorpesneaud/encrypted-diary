import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Password from '../Password';

interface Entry {
  id: number;
  content: string;
}

const ReadEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const entries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
  const entry = entries.find((entry) => entry.id === Number(id));

  if (!entry) {
    return <p>Entry not found</p>;
  }

  const handleDecrypt = (password: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(entry.content, password);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Incorrect password or invalid message');
      }

      setDecryptedMessage(decryptedText);
      setError('');
    } catch {
      setError('Incorrect password or decryption failed');
    }
  };

  return (
    <div>
      <h1>Read Entry</h1>
      {decryptedMessage ? (
        <p>{decryptedMessage}</p>
      ) : (
        <div>
          <Password onSubmitPassword={handleDecrypt} /> 
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ReadEntry;