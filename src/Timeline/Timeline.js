import moment from "moment";
import React from "react";
import TimelineItem from "./TimelineItem";
import './style.scss';




function Timeline({ history, setHistory }) {

    function removeFromHistory(timeString) {
        const index = history.findIndex(item => item.time === timeString);
        history.splice(index, 1)
        console.log(history);
        setHistory([...history]);
        localStorage.setItem("History", JSON.stringify(history));
    }

    function getFormattedData(items) {
        const activities = {};
        items.forEach(({ time, name, duration }, index) => {
            const date = moment(time);
            const dateStr = date.format("H:00");
            const list = activities[dateStr] || [];
            list.push({
                time: date.format("hh:mm"),
                name,
                key: index,
                duration: duration,
                callDelete: (() => removeFromHistory(time)),
            });
            activities[dateStr] = list;
        });
        return activities;
    }

    function getUlClass(index, size) {
        let className = "time-line";
        if (index === 0) {
            className += " first";
        }
        if (index === size - 1) {
            className += " last";
        }
        return className;
    }

    const activities = getFormattedData(history);
    const dates = Object.keys(activities);
    console.log(history);
    return (
        <div className="time-line-ctnr">
            {dates.map((d, index) => (
                <ul className={getUlClass(index, dates.length)} key={d}>
                    <li className="time-label">
                        <span>{d}</span>
                    </li>
                    {activities[d].map(({ time, name, key, duration, callDelete }) => (
                        <TimelineItem time={time} text={name} duration={duration} key={key} callDelete={callDelete} />
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default Timeline;