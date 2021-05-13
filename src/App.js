import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import { Header } from './components/Header'
import { Joke } from './components/Joke'
import { ScrollContainer, ScrollPage } from "react-scroll-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [joke, setJoke] = useState([])
  const [top, setTop] = useState(false)
  const [bottom, setBottom] = useState(false)
  const [start, setStart] = useState(true)

  const red = '#db7070'
  const blue = '#7099db'

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) === document.documentElement.scrollHeight
    const top = window.pageYOffset === 0
    if (top) {
      setTop(true)
      document.body.style.backgroundColor = blue;
    }
    if (bottom) {
      setBottom(true)
      document.body.style.backgroundColor = red;
    }
  }

  const getJoke = async () => {
    return await axios.get('https://official-joke-api.appspot.com/random_joke')
  }
  useEffect(() => {
    const showLine = async () => {
      if (start) {
        document.body.style.backgroundColor = blue;
        let res = await getJoke()
        document.querySelector('#setup').innerHTML = res.data.setup
        document.querySelector('#punchline').innerHTML = res.data.punchline
        setStart(false)
        setJoke({ setup: res.data.setup, punchline: res.data.punchline })
      }
      else if (bottom) {
        let res = await getJoke()
        document.querySelector('#setup').innerHTML = res.data.setup
        setBottom(false)
        setJoke({ setup: res.data.setup, punchline: res.data.punchline })
      }
      else if (top) {
        document.querySelector('#punchline').innerHTML = joke.punchline
        setTop(false)
      }
    }
    showLine()

  }, [top, bottom, start, joke.punchline])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <ScrollContainer>
        <ScrollPage page={0}>
          <Header />
          <Joke id={"setup"} />
        </ScrollPage>
        <ScrollPage page={1} />
        <ScrollPage page={2}>
          <Joke id={"setup"} />
          <Joke id={"punchline"} />
        </ScrollPage>
      </ScrollContainer >
    </div >
  );
}

export default App;
