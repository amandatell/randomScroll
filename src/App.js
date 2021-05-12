import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, Sticky } from "react-scroll-motion";

function App() {
  const [joke, setJoke] = useState([])
  const [top, setTop] = useState(false)
  const [bottom, setBottom] = useState(false)
  const [start, setStart] = useState(true)

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
      if (start) {
        document.querySelector('#setup').innerHTML = res.data.setup
        document.querySelector('#punchline').innerHTML = res.data.punchline
        setStart(false)
      }
      setJoke({ setup: res.data.setup, punchline: res.data.punchline })
    })
  }
  useEffect(() => {
    async function fetchData() {
      if (start) {
        await getJoke()
      }
      else if (top) {
        console.log('top')
        document.querySelector('#punchline').innerHTML = joke.punchline
      }
      else if (bottom) {
        console.log('bottom')
        await getJoke().then(() => {
          document.querySelector('#setup').innerHTML = joke.setup
        })
      }
    }
    fetchData()

  }, [top, bottom, start])

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
            <span id="setup" style={{ fontSize: "40px" }}></span>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1} />
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <span id="punchline" style={{ fontSize: "40px" }}></span>
          </Animator>
        </ScrollPage>
      </ScrollContainer >
    </div >
  );
}

export default App;
