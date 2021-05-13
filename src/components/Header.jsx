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
        visible,
    } = usePopperTooltip();
    return (
        <div className='d-flex justify-content-center'>
            <h1 className="mt-5">Scroll a joke!</h1> <Button className="btn btn-link" style={{ backgroundColor: "white", color: 'black', border: 'none' }} ref={setTriggerRef}>
                <FiHelpCircle className="mt-5" size={32} />
            </Button>
            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                    <p>Tooltip</p>
                </div>
            )}

        </div>
    )
}
