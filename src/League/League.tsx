import React from 'react';
import ILeague from '../LeagueService';
import Matches from '../Matches/Matches';
import './League.scss';

export default function League(props: {league: ILeague}) {
    const {name, start, matches} = props.league;

    return (
        <div className="league-container">
            <div className="league">
                <div className="league-name">{name}</div>
                <div className="league-date">{new Date(start).toDateString()}</div>
            </div>            
            <Matches matches={matches} />
        </div>
    )
}