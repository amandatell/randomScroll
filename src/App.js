import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, Sticky } from "react-scroll-motion";

function App() {

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) === document.documentElement.scrollHeight
    const top = window.pageYOffset === 0

    if (bottom) {
      console.log('at the bottom');
    }
    else if (top)
      console.log('at the top');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <div className="App container">
      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={FadeUp}>
            <span style={{ fontSize: "40px" }}>Up</span>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>

        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <span style={{ fontSize: "40px" }}>Down⛅️</span>
          </Animator>
        </ScrollPage>
      </ScrollContainer >
    </div >
  );
}

export default App;
