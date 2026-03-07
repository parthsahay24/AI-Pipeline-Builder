import React, { useEffect, useRef } from 'react';
import { GripVertical } from 'lucide-react';
import gsap from 'gsap';

export const DraggableNode = ({ type, label }) => {
  const dragRef = useRef(null);

  useEffect(() => {
    // GSAP entrance cascade effect for the toolbar items
    gsap.fromTo(dragRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: Math.random() * 0.3 }
    );
  }, []);

  const onMouseEnter = () => {
    gsap.to(dragRef.current, { scale: 1.05, y: -4, duration: 0.4, ease: "back.out(2)" });
  };

  const onMouseLeave = () => {
    gsap.to(dragRef.current, { scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      ref={dragRef}
      className={`draggable-item ${type}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="draggable-item-inner">
        <div className="drag-icon-wrapper">
          <GripVertical size={16} color="var(--accent)" />
        </div>
        <span className="drag-label">{label}</span>
      </div>
    </div>
  );
};