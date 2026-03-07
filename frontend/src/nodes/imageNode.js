import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Image as ImageIcon } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export const ImageNode = ({ id, selected }) => {
  const [prompt, setPrompt] = useState('A cinematic landscape');

  return (
    <BaseNode
      id={id}
      title="Image Gen"
      icon={ImageIcon}
      selected={selected}
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'image' }]}
    >
      <label>
        Prompt:
        <TextareaAutosize 
          minRows={2}
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className="nodrag"
        />
      </label>
    </BaseNode>
  );
}
