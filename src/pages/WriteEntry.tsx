import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import Password from '../Password';
import { useEntries } from '../context/EntriesContext';

const WriteEntry: React.FC = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const { addEntry } = useEntries();

  const handleEncrypt = (password: string) => {
    const encryptedText = CryptoJS.AES.encrypt(message, password).toString();
    setEncryptedMessage(encryptedText);

    const newEntry = { id: Date.now(), content: encryptedText };
    addEntry(newEntry);
    alert('Message encrypted and saved!');
  };

  return (
    <div>
      <h1>Write a New Entry</h1>
      <textarea
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Password onSubmitPassword={handleEncrypt} />
      {encryptedMessage && <p>Encrypted Message: {encryptedMessage}</p>}
    </div>
  );
};

export default WriteEntry;