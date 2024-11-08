import React from 'react';
import { useEntries } from '../context/EntriesContext';

const EntryList: React.FC = () => {
  const { entries } = useEntries();
  console.log("Entries in EntryList:", entries);

  return (
    <div>
      <h1>Liste des Entrées</h1>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry.id}>
            <p>id = {entry.id} content = {entry.content} lien : <a href={`http://localhost:3000/read/${entry.id}`}> ici </a></p>
          </div>
        ))
      ) : (
        <p>Aucune entrée trouvée</p>
      )}
    </div>
  );
};

export default EntryList;