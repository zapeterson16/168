import React from "react";
import PropTypes from "prop-types";
import useLongPress from '../Utilities/LongPress';
import './style.scss';

/**
 * @usage
 * <TimlineItem time={time} text={text} />
 */
function TimlineItem({ time, text, duration, callDelete }) {
    const textLongPress = useLongPress(callDelete, 750);

    return (
        <li>
            <i onClick={callDelete} className="fa" />
            <div className="time-line-item">
                <span className="time">
                    <i className="fa fa-clock-o" />
                    {duration} min
                </span>
                <div className="time-line-header" {...textLongPress}>{text}</div>
            </div>
        </li>
    );
}

TimlineItem.defaultProps = {};

TimlineItem.propTypes = {
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default TimlineItem;