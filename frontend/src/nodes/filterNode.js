import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Filter } from 'lucide-react';

export const FilterNode = ({ id, selected }) => {
  const [condition, setCondition] = useState('x > 10');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon={Filter}
      selected={selected}
      inputs={[{ id: 'data' }]}
      outputs={[{ id: 'filtered' }, { id: 'rejected' }]}
    >
      <label>
        Condition:
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
}
