import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Globe } from 'lucide-react';

export const ApiNode = ({ id, selected }) => {
  const [url, setUrl] = useState('https://api.example.com');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={Globe}
      selected={selected}
      inputs={[{ id: 'trigger' }, { id: 'payload' }]}
      outputs={[{ id: 'response' }, { id: 'error' }]}
    >
      <label>
        Endpoint URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
}
