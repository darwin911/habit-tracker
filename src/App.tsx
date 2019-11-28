import React, { useState } from 'react';
import './scss/style.css';
import 'semantic-ui-css/semantic.min.css';
import { Authentication } from './components/Authentication';

import { TrackerContainer } from './components/TrackerContainer';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <div className='App'>
      {isLoggedIn ? (
        <TrackerContainer />
      ) : (
        <>
          <Authentication setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </div>
  );
};

export default App;
