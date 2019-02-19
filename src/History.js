import React from 'react';
import { formatTimeString, getDuration } from './Utilities/timeHelpers';
import './EntryBar.css'

function History(props) {
    function removeFromHistory(timeString) {
        const { history } = props;
        const index = history.findIndex(item => item.time === timeString);
        history.splice(index, 1)
        console.log(history);
        props.setHistory([...history]);
        localStorage.setItem("History", JSON.stringify(history));
    }

    return (<div className="History">
        {props.history.map((item, index) => <div className="HistoryItem">
            <div className="Time">{formatTimeString(item.time)}</div><div className="Name">{item.name}</div><div className="Duration">{index < props.history.length - 1 ? getDuration(item.time, props.history[index + 1].time) : ''}</div><button onClick={() => removeFromHistory(item.time)}>X</button>
        </div>)}
    </div>
    );
}

export default History;