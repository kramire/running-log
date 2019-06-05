import React, { useState } from 'react';
import './App.css';

import '../node_modules/bulma/css/bulma.css';

import { AddRun } from './components';

// export const AppContext = React.createContext();

function App() {

  const [isModalActive, setModal] = useState(false);

  return (
    <div className="App">Hi there
      <button onClick={() => setModal(true)}>Add Run +</button>
      <AddRun isModalActive={isModalActive} handleClick={() => setModal('')}></AddRun>
    </div>
  );
}

export default App;
