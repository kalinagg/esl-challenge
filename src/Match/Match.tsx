import React from 'react'
import Participant from '../Participant/Participant';
import {IMatch, IParticipant} from '../LeagueService';
import './Match.scss';

export default function Match(props: {match: IMatch}) {
    const match = props.match;
    const participants = match.participants;

    const sortParticipants = (ps: IParticipant[]): IParticipant[] => {
        ps.sort(compareByPlace);
        return ps;
    }

    const compareByPlace = (a: IParticipant, b: IParticipant): number => a.place - b.place;

    const sortedParticipants = sortParticipants(participants);

    const winner = (participantId: number): boolean => {
        return participantId === sortedParticipants[0].id;
    }

    const formatedTime = (date: string): string => {
        const hours = new Date(date).getHours();
        const minutes = new Date(date).getMinutes();
        const zero = minutes < 9 ? '0' : '';
        
        return `${hours}:${zero}${minutes}`;
    }

    return (
        <div className="match">
            <div className="match-time">
                {formatedTime(match.start)}
            </div>
            {sortedParticipants.map(p => (
                <Participant key={p.id} participant={p} winner={winner} />
            ))}
        </div>
    )
}
