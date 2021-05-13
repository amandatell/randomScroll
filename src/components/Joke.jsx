import { Animator, batch, Fade, Move, Sticky } from "react-scroll-motion";

export const Joke = ({ id }) => {
    const FadeUp = batch(Fade(), Move(), Sticky());
    return (
        <Animator animation={FadeUp}>
            <span id={id}></span>
        </Animator>
    )
}
