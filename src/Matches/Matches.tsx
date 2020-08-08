import React, {useState} from 'react';
import {IMatch} from '../LeagueService';
import Match from '../Match/Match';
import './Matches.scss';

export default function Matches(props: {matches: IMatch[]}) {
    const [sortAscending, setSortAscending] = useState(true);

    const sortMatches = (ms: IMatch[], sortAscending: boolean): IMatch[] => { 
        ms = [...ms];

        if (sortAscending) {
            ms.sort((a, b) => a.start.getTime() - b.start.getTime());
            return ms;
        }

        ms.sort((a, b) => b.start.getTime() - a.start.getTime());
        return ms;       
    }

    const handleReverse = () => {       
        setSortAscending(!sortAscending);
    }

    return (
        <div className="matches-container">
            <div className="matches-date">
                <button            
                    className={"matches-date-button " + (sortAscending ? "arrow-up" : "arrow-down")}
                    onClick={handleReverse}>
                    Date
                </button>
            </div>
            <div className="matches">
                {sortMatches(props.matches, sortAscending).map(m => (
                    <Match key={m.id} match={m} />
                ))}
            </div>
        </div>
    )
}
