import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { FileText } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(['input']);

  // Extract variables when text changes
  useEffect(() => {
    // Matches any alphabet string surrounded by {{ }}
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1]);
    
    // Unique variables to avoid duplicate handles
    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Convert extracted variables into input objects for BaseNode
  const dynamicInputs = variables.map((variable) => ({
    id: variable
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={FileText}
      selected={selected}
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
    >
      <label>
        Text:
        <TextareaAutosize 
          minRows={1}
          value={currText} 
          onChange={handleTextChange} 
          placeholder="e.g. hello {{name}}"
          className="nodrag" // Prevents the text drag from moving the node in ReactFlow
        />
      </label>
    </BaseNode>
  );
}
