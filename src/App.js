import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

function App() {

  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
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
