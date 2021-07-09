import React from 'react';
import { getHistoryWithDuration } from './Utilities/timeHelpers';

function getTags(inputString) {
    const words = inputString.split(' ');

    let tags = [];

    words.forEach(element => {
        if (element.indexOf('#') !== -1) {
            tags.push(element);
        }
    });
    return tags;
}

function TagSummary(props) {
    const historyWithDuration = getHistoryWithDuration(props.history);

    let tags = {};

    historyWithDuration.forEach(element => {
        const elementTags = getTags(element.name);

        if (elementTags) {
            elementTags.forEach(tag => {
                if (!(tag in tags)) {
                    tags[tag] = 0;
                }
                tags[tag] = tags[tag] + element.duration;
            });
        }
    });
    console.log(historyWithDuration);



    return (
        <div>{Object.keys(tags).map(function (key) {
            return (<div><span>{key}</span> <span>{tags[key]}</span></div>)
        })}
        </div>);

}

export default TagSummary;
