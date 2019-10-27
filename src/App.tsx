import React, { useState } from 'react';
import './scss/App.css';
import 'semantic-ui-css/semantic.min.css';
import { Login } from './components/Login';

import { TrackerContainer } from './components/TrackerContainer';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div className='App'>
      {isLoggedIn ? (
        <TrackerContainer entries={[]} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default App;
