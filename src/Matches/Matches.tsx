import React, { useState, useEffect } from 'react';
import { IMatch } from '../LeagueService';
import Match from '../Match/Match';
import './Matches.scss';

export default function Matches(props: {matches: IMatch[]}) {
    const sortMatches = (ms: IMatch[]): IMatch[] => {        
        ms.sort(compareByTime);        
        return ms;
    }
    
    const compareByTime = (a: IMatch, b: IMatch): number => {
        const aStart = a.start.toUpperCase();
        const bStart = b.start.toUpperCase();
        
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;
        return 0;
    }

    const sortedMatches = sortMatches(props.matches);
    // const [matches, setMatches] = useState<IMatch[]>(sortedMatches);

    const handleReverse = () => {        
        // setMatches(reverseSortMatches(matches));
    }

    // const reverseSortMatches = (ms: IMatch[]): IMatch[] => {
    //     ms.reverse();
    //     return ms;
    // }

    return (
        <div className="matches-container">
            <div className="matches-date">
                <button            
                    className={"matches-date-button " + (false ? "arrow-down" : "arrow-up")}
                    onClick={handleReverse}>
                    Date
                </button>
            </div>
            <div className="matches">
                {sortedMatches.map(m => (
                    <Match key={m.id} match={m} />
                ))}
            </div>
        </div>
    )
}
