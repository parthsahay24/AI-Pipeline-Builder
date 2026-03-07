import { BaseNode } from './BaseNode';
import { BrainCircuit } from 'lucide-react';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={BrainCircuit}
      selected={selected}
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
    >
      <div style={{ padding: '8px 0', color: 'var(--text-muted)' }}>
        <span>This is an interactive Large Language Model node.</span>
      </div>
    </BaseNode>
  );
}
