import { useState, useRef, useCallback, useContext } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ThemeContext } from './ThemeProvider';
import gsap from 'gsap';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiNode } from './nodes/apiNode';
import { FilterNode } from './nodes/filterNode';
import { MemoryNode } from './nodes/memoryNode';
import { MathNode } from './nodes/mathNode';
import { ImageNode } from './nodes/imageNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: ApiNode,
  filter: FilterNode,
  memory: MemoryNode,
  math: MathNode,
  image: ImageNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { theme } = useContext(ThemeContext);
    
    // Dynamic theme variables for MiniMap & Background
    const isDark = theme === 'dark';
    const miniMapNodeColor = isDark ? '#1E293B' : '#FFFFFF';
    const miniMapMaskColor = isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(241, 245, 249, 0.7)';
    const bgColor = isDark ? '#334155' : '#94A3B8';

    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) return;
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // SOURCE CREDIT: GSAP Physics (https://gsap.com/)
    // Hooking into ReactFlow native callbacks to inject gamified physical GSAP bounces during drag
    const onNodeDragStart = (event, node) => {
      const el = document.querySelector(`[data-id="${node.id}"] .base-node`);
      if(el) {
        gsap.to(el, { scale: 1.05, rotation: 2, duration: 0.2, ease: "back.out(1.7)" });
      }
    };

    const onNodeDragStop = (event, node) => {
      const el = document.querySelector(`[data-id="${node.id}"] .base-node`);
      if(el) {
        gsap.to(el, { scale: 1, rotation: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      }
    };

    return (
        <div className="canvas-container" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeDragStart={onNodeDragStart}
                onNodeDragStop={onNodeDragStop}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                style={{ zIndex: 1 }}
            >
                <Background color={bgColor} gap={gridSize} size={1.5} />
                <Controls />
                <MiniMap 
                  nodeStrokeColor="#6366F1" 
                  nodeColor={miniMapNodeColor} 
                  maskColor={miniMapMaskColor} 
                />
            </ReactFlow>
        </div>
    )
}
