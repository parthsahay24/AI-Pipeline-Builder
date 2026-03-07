import React, { useEffect, useState } from 'react';
import anime from 'animejs';

// SOURCE CREDIT: AnimeJS Documentation (https://animejs.com/documentation/#staggering)
// Using AnimeJS v3 specifically to bypass CRA Webpack bundler limitations.
// This cinematic loader splits text and uses stagger delays for a gamified sequence.
export const Loader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = anime.timeline({
      complete: () => {
        setIsVisible(false);
        if(onComplete) onComplete();
      }
    });

    tl.add({
      targets: '.loader-box',
      scale: [0, 1],
      opacity: [0, 1],
      rotateZ: [45, 0],
      delay: anime.stagger(200, { grid: [3, 1], from: 'center' }),
      duration: 800,
      easing: 'easeInOutQuad'
    })
    .add({
      targets: '.loader-text .letter',
      translateY: [20, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: anime.stagger(50)
    }, '-=400')
    .add({
      targets: '.loader-container',
      opacity: 0,
      duration: 500,
      easing: 'easeOutSine',
      delay: 500
    });

  }, [onComplete]);

  if (!isVisible) return null;

  const text = "VECTORSHIFT";

  return (
    <div className="loader-container">
      <div className="loader-graphics">
        <div className="loader-box"></div>
        <div className="loader-box"></div>
        <div className="loader-box"></div>
      </div>
      <h1 className="loader-text">
        {text.split('').map((char, i) => (
          <span key={i} className="letter" style={{ display: 'inline-block' }}>{char}</span>
        ))}
      </h1>
    </div>
  );
};
