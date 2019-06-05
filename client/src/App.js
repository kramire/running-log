import React, { useState } from 'react';
import './App.css';

import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';

export const AppContext = React.createContext();

function App() {

  const [isModalActive, setModal] = useState('');

  const toggleAddRun = () => isModalActive === '' ? setModal('is-active') : setModal('');

  return (
    <AppContext.Provider value={{isModalActive, toggleAddRun}}>
      <div className="App">Hi there
        <button onClick={toggleAddRun}>Add Run +</button>
        <AddRun></AddRun>
      </div>
    </AppContext.Provider>
  );
}

export default App;
