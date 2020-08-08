import React from 'react';
import {IParticipant} from '../LeagueService';
import './Participant.scss';

export default function Participant(props: {participant: IParticipant, winner: boolean}) {
    const {name, points} = props.participant;

    return (        
        <div className={"participant " + (props.winner && "winner")}>
            <div>{name}</div>
            <div className="points">{points}</div>
        </div>
    )
}
