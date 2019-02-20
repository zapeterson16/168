import React, { useState, useEffect } from 'react';
import History from './History';
import EntryBar from './EntryBar';
import TagSummary from './TagSummary';

function HomePage(props) {
    const [history, setHistory] = useState([]);
    useEffect(() => {
        let storedHistory = JSON.parse(localStorage.getItem("History"));
        if (storedHistory) {
            setHistory(storedHistory);

        }
    }, []);

    return (
        <div>
            <EntryBar history={history} setHistory={setHistory} />
            <History history={history} setHistory={setHistory} />
            <TagSummary history={history} />
        </div>
    )
}

export default HomePage;

