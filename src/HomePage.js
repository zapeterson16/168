import React, { useState, useEffect } from 'react';
import EntryBar from './EntryBar';
import TagSummary from './TagSummary';
import Timeline from './Timeline/Timeline'
import { getHistoryWithDuration } from './Utilities/timeHelpers';
import "./HomePage.css";

function HomePage(props) {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        let storedHistory = JSON.parse(localStorage.getItem("History"));
        if (storedHistory) {
            setHistory(storedHistory);

        }
    }, []);

    return (
        <div className="HomePage">
            <EntryBar history={history} setHistory={setHistory} />
            <Timeline history={getHistoryWithDuration(history)} setHistory={setHistory} />
            <TagSummary history={history} />

        </div>
    )
}

export default HomePage;

