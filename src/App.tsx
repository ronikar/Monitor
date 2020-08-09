import React from 'react';
import './App.scss';
import { ProvideMonitor } from './conext/MonitorContext';
import { StatusTable } from './status/StatusTable';

function App() {
  return (
    <div className="App">
      <ProvideMonitor>
        <header className="App-header">
          <h1>ניטור בסיסי</h1>
        </header>
        <section>
          <StatusTable />
        </section>
      </ProvideMonitor>
    </div>
  );
}

export default App;
