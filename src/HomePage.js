import React, { useState, useEffect } from 'react';
import History from './History';
import EntryBar from './EntryBar';
import TagSummary from './TagSummary';
import Timeline from './Timeline/Timeline'

const events = [
    { ts: "2017-09-18T14:22:46.587", text: 'Logged in' },
    { ts: "2017-09-18T19:21:46.587", text: 'Clicked Home Page' },
    { ts: "2017-09-18T21:20:46.587", text: 'Edited Profile' },
    { ts: "2017-09-16T22:22:46.587", text: 'Registred' },
    { ts: "2017-09-16T22:21:46.587", text: 'Clicked Cart' },
    { ts: "2017-09-16T22:20:46.587", text: 'Clicked Checkout' },
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
        <div className="HomePage">
            <EntryBar history={history} setHistory={setHistory} />
            <History history={history} setHistory={setHistory} />
            <TagSummary history={history} />
            {/* <Timeline items={events} /> */}

        </div>
    )
}

export default HomePage;

