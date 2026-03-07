import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Database } from 'lucide-react';

export const MemoryNode = ({ id, selected }) => {
  const [storeKey, setStoreKey] = useState('session_id');

  return (
    <BaseNode
      id={id}
      title="Memory Store"
      icon={Database}
      selected={selected}
      inputs={[{ id: 'context' }]}
      outputs={[{ id: 'memory' }]}
    >
      <label>
        Key:
        <input 
          type="text" 
          value={storeKey} 
          onChange={(e) => setStoreKey(e.target.value)} 
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
}
