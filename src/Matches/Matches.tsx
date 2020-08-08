import React, {useState, useEffect} from 'react';
import {IMatch} from '../LeagueService';
import Match from '../Match/Match';
import './Matches.scss';

export default function Matches(props: {matches: IMatch[]}) {
    const sortMatches = (ms: IMatch[], sortAscending: boolean): IMatch[] => { 
        if (sortAscending) {
            ms.sort(compareByTime);
            return ms;
        }

        ms.sort((a, b) => -1 * compareByTime(a, b));
        return ms;       
    }
    
    const compareByTime = (a: IMatch, b: IMatch): number => {
        const aStart = a.start.toUpperCase();
        const bStart = b.start.toUpperCase();
        
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;
        return 0;
    }

    const [matches, setMatches] = useState<IMatch[]>(props.matches);
    const [sortAscending, setSortAscending] = useState(true);

    const handleReverse = () => {       
        setSortAscending(!sortAscending);
    }

    const reverseSortMatches = (ms: IMatch[]): IMatch[] => {
        ms = [...ms];
        ms.reverse();
        return ms;
    }

    useEffect(() => {
        setMatches(props.matches);
    }, [props.matches]);

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
                {sortMatches(matches, sortAscending).map(m => (
                    <Match key={m.id} match={m} />
                ))}
            </div>
        </div>
    )
}
