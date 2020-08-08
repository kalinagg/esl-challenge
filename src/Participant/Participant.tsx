import React from 'react';
import { IParticipant } from '../LeagueService';
import './Participant.scss';

export default function Participant(props: {participant: IParticipant, winner: (participantId: number) => boolean}) {
    const {id, name, points} = props.participant;

    return (        
        <div className={"participant " + (props.winner(id) && "winner")}>
            <div>{name}</div>
            <div className="points">{points}</div>
        </div>
    )
}
