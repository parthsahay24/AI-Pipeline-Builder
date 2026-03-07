import React from 'react';
import { DraggableNode } from './draggableNode';
import { Layers } from 'lucide-react';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar-panel">
            <div className="toolbar-title">
                <Layers /> Components
            </div>
            <div className="nodes-grid">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM Node' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text Logic' />
                <hr style={{borderColor: 'rgba(150,150,150,0.1)', margin: '8px 0'}} />
                <DraggableNode type='api' label='API Query' />
                <DraggableNode type='filter' label='Data Filter' />
                <DraggableNode type='memory' label='Memory DB' />
                <DraggableNode type='math' label='Math Ops' />
                <DraggableNode type='image' label='Image Gen' />
            </div>
        </div>
    );
};
