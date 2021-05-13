import { usePopperTooltip } from 'react-popper-tooltip';
import { FiHelpCircle } from 'react-icons/fi';
import 'react-popper-tooltip/dist/styles.css';
import { Button } from 'react-bootstrap';

export const Header = () => {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible
    } = usePopperTooltip();

    return (
        <div className='d-flex justify-content-center'>
            <h1 className="mt-5">Scroll a joke!</h1> <Button className="btn btn-link mt-5 mx-1" ref={setTriggerRef}>
                <FiHelpCircle size={32} />
            </Button>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    <p>Scroll to see the punchline. Once you reach the bottom a new joke with genererate.</p>
                    <p><em>Not working?</em> Make you you scroll all the way to the bottom until the background gets red,</p>
                    <p>then all the way to the top until the background gets blue again to allow it to reset.</p>
                    <p><b>Have fun!</b></p>
                </div>
            )}

        </div>
    )
}
