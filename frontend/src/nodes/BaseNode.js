// src/nodes/BaseNode.js
import React, { useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import gsap from 'gsap';

export const BaseNode = ({ id, title, icon: Icon, inputs = [], outputs = [], children, selected }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    // SOURCE CREDIT: GSAP (https://gsap.com/)
    // Pop-in bounce animation upon node generation/drop on the canvas
    gsap.fromTo(nodeRef.current, 
      { scale: 0, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }
    );
  }, []);

  return (
    <div
      ref={nodeRef}
      className={`base-node ${selected ? 'selected' : ''}`}
    >
      {/* Dynamic Left Handles (Inputs) */}
      {inputs.map((input, index) => {
        const top = `${((index + 1) * 100) / (inputs.length + 1)}%`;
        return (
          <Handle
            key={`${id}-${input.id}`}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top }}
          />
        );
      })}

      <div className="node-inner">
        {/* Node Header */}
        <div className="node-header">
          <div className="node-title">
            {Icon && <Icon size={18} />}
            <span>{title}</span>
          </div>
        </div>

        {/* Node Custom Content */}
        <div className="node-content">
          {children}
        </div>
      </div>

      {/* Dynamic Right Handles (Outputs) */}
      {outputs.map((output, index) => {
        const top = `${((index + 1) * 100) / (outputs.length + 1)}%`;
        return (
          <Handle
            key={`${id}-${output.id}`}
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{ top }}
          />
        );
      })}
    </div>
  );
};
