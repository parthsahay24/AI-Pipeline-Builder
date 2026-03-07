import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeProvider } from './ThemeProvider';
import { Loader } from './Loader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className="app-container" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
