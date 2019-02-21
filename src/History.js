import React from 'react';
import { formatTimeString, getHistoryWithDuration } from './Utilities/timeHelpers';
import './History.css'
import Timeline from './Timeline/Timeline'

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
        {/* {getHistoryWithDuration(props.history).reverse().map((item, index) => <div className="HistoryItem">
            <div className="Time">{formatTimeString(item.time)}</div><div className="Name">{item.name}</div><div className="Duration">{item.duration}</div><button onClick={() => removeFromHistory(item.time)}>X</button>
        </div>)} */}
        <Timeline history={getHistoryWithDuration(props.history)} setHistory={props.setHistory} />
    </div>
    );
}

export default History;