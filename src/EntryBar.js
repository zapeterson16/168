import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import './EntryBar.css'
// let initialSuggestions = [
//     "Working",
//     "Studying",
//     "Illustrator",
//     "Studying 250",
//     "Eating",
//     "Eating Lunch",
//     "Eating Dinner",
//     "Eating Breakfast"
// ]

let initialSuggestions = new Set(
    [
        "Working",
        "Studying",
        "Illustrator",
        "Studying 250",
        "Eating",
        "Eating Lunch",
        "Eating Dinner",
        "Eating Breakfast"
    ]
)

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : [...initialSuggestions].filter(suggestion =>
        suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

function formatTime(dateString) {
    let d = new Date(dateString);
    return d.getHours().toString() + ":" + d.getMinutes().toString();
}

function getDuration(timeStartString, timeEndString) {
    let startDate = new Date(timeStartString);
    let endDate = new Date(timeEndString);
    let duration = endDate - startDate;
    console.log(duration.toString());
    let durationInMs = parseInt(duration.toString());
    let durationInMin = Math.floor(durationInMs / 60000);
    return durationInMin;
}

function EntryBar(props) {
    const [eventVal, setEventVal] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        let storedHistory = JSON.parse(localStorage.getItem("History"));
        console.log(storedHistory);
        if (storedHistory) {
            setHistory(storedHistory);
        }
    }, [])

    function onChange(event, { newValue }) {
        setEventVal(newValue);
    }

    function onSuggestionsFetchRequested({ value }) {
        setSuggestions(getSuggestions(value));
    };

    function onSuggestionsClearRequested() {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Type an event',
        value: eventVal,
        onChange: onChange
    };

    function addSuggestion() {
        initialSuggestions.add(eventVal);

        let d = new Date();
        let newEvent = { time: d.toString(), name: eventVal }

        setEventVal('');
        setHistory([...history, newEvent]);
        localStorage.setItem("History", JSON.stringify([...history, newEvent]));
    }

    function renderHistory() {
        console.log(history.length);
        return (<div className="History">
            {history.map((item, index) => <div className="HistoryItem">
                <div className="Time">{formatTime(item.time)}</div><div className="Name">{item.name}</div><div>{index < history.length - 1 ? getDuration(item.time, history[index + 1].time) : ''}</div>
            </div>)}
        </div>
        );
    }

    return (
        <div>
            <div className="topBar">
                <div className="EntryBoxParent">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={addSuggestion}
                    />
                </div>
                <button onClick={addSuggestion}>go</button>
            </div>
            <div>
                {renderHistory()}
            </div>
        </div>
    );
}

export default EntryBar;