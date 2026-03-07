import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Calculator } from 'lucide-react';

export const MathNode = ({ id, selected }) => {
  const [operation, setOperation] = useState('Add');

  return (
    <BaseNode
      id={id}
      title="Math Operation"
      icon={Calculator}
      selected={selected}
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
    >
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
          <option value="Multiply">Multiply</option>
          <option value="Divide">Divide</option>
        </select>
      </label>
    </BaseNode>
  );
}
