import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, Sticky } from "react-scroll-motion";
import { FiHelpCircle } from 'react-icons/fi';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

/*

IMPORT BUTTON FROM REACT BOOSTRAP
PUT IN AN COMPONENT

*/
function App() {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  const [joke, setJoke] = useState([])
  const [top, setTop] = useState(false)
  const [bottom, setBottom] = useState(false)
  const [start, setStart] = useState(true)

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) === document.documentElement.scrollHeight
    const top = window.pageYOffset === 0
    if (top) setTop(true)
    if (bottom) setBottom(true)
  }

  const getJoke = async () => {
    return await axios.get('https://official-joke-api.appspot.com/random_joke')
  }
  useEffect(() => {
    const showLine = async () => {
      if (start) {
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

  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <div className="App container">


      <ScrollContainer>
        <ScrollPage page={0}>
          <h1>Scroll a joke! <button type="button" ref={setTriggerRef}>
            <FiHelpCircle />
          </button>
            {visible && (
              <div
                ref={setTooltipRef}
                {...getTooltipProps({ className: 'tooltip-container' })}
              >
                <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          Tooltip
              </div>
            )}
          </h1>
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
