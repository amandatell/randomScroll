import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, Sticky } from "react-scroll-motion";

function App() {
  const [joke, setJoke] = useState([])
  const [top, setTop] = useState(true)
  const [bottom, setBottom] = useState(false)

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) === document.documentElement.scrollHeight
    const top = window.pageYOffset === 0

    if (top) setTop(true)
    else setTop(false)
    if (bottom) setBottom(true)
    else setBottom(false)
  }

  const getJoke = async () => {
    await axios.get('https://official-joke-api.appspot.com/random_joke').then((res) => {
      setJoke({ setup: res.data.setup, punchline: res.data.punchline })
      console.log(joke)
    })
  }

  useEffect(async () => {
    await getJoke().then(

    )
  }, [top], [bottom])
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
            <span style={{ fontSize: "40px" }}></span>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>

        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <span style={{ fontSize: "40px" }}></span>
          </Animator>
        </ScrollPage>
      </ScrollContainer >
    </div >
  );
}

export default App;
