import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import './EntryBar.css'
import { isConstructorDeclaration } from 'typescript';


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

function EntryBar(props) {
    const [eventVal, setEventVal] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (props.history) {
            for (let itemIndex in props.history) { // Move to entry bar, pass history by props put in effect
                initialSuggestions.add(props.history[itemIndex].name);
            }
        }
    }, [props.history]);

    useEffect(
        () => {
            document.addEventListener("keydown", (e) => _handleKeyPress(e, getEventVal()))
            return () => document.removeEventListener("keydown", _handleKeyPress)
        },
        []
    );

    function getEventVal() {
        return eventVal;
    }
    function onChange(event, { newValue }) {
        setEventVal(newValue);
        console.log("in on change");
    }

    function onSuggestionsFetchRequested({ value }) {
        setSuggestions(getSuggestions(value));
    };

    function onSuggestionsClearRequested() {
        setSuggestions([]);
    };

    function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
        submitEvent(suggestion);
    }


    const inputProps = {
        placeholder: 'Type an event',
        value: eventVal,
        onChange: onChange
    };

    function submitEvent(newEventVal) {
        initialSuggestions.add(newEventVal);

        let d = new Date();
        let newEvent = { time: d.toString(), name: newEventVal }
        console.log(newEvent);
        setEventVal('');
        props.setHistory([...props.history, newEvent]);
        localStorage.setItem("History", JSON.stringify([...props.history, newEvent]));
    }

    function test() {
        console.log("In Test")
        console.log(eventVal);
    }

    function _handleKeyPress(e, test) {
        console.log(test);
        if (e.key === 'Enter') {
            console.log("In handle keypress");
            if (eventVal !== '') {
                submitEvent(eventVal);
            }
            console.log(eventVal.toString());
            // test();
        }
    }

    return (
        <div className="topBar">
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
            />
            <div className="GoHolder"><button onClick={() => submitEvent(eventVal)}>go</button></div>
        </div>
    );
}

export default EntryBar;