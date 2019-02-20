import React, { useState, useEffect } from 'react';
import History from './History';
import EntryBar from './EntryBar';
import TagSummary from './TagSummary';
import Timeline from './Timeline/Timeline'

const events = [
    { ts: "2017-09-17T12:22:46.587Z", text: 'Logged in' },
    { ts: "2017-09-17T12:21:46.587Z", text: 'Clicked Home Page' },
    { ts: "2017-09-17T12:20:46.587Z", text: 'Edited Profile' },
    { ts: "2017-09-16T12:22:46.587Z", text: 'Registred' },
    { ts: "2017-09-16T12:21:46.587Z", text: 'Clicked Cart' },
    { ts: "2017-09-16T12:20:46.587Z", text: 'Clicked Checkout' },
];

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
            {/* <EntryBar history={history} setHistory={setHistory} />
            <History history={history} setHistory={setHistory} />
            <TagSummary history={history} /> */}
            <Timeline items={events} />

        </div>
    )
}

export default HomePage;

