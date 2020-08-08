import React from 'react'
import Participant from '../Participant/Participant';
import {IMatch, IParticipant} from '../LeagueService';
import './Match.scss';

export default function Match(props: {match: IMatch}) {
    const match = props.match;
    const participants = match.participants;

    const sortParticipants = (ps: IParticipant[]): IParticipant[] => {
        ps = [...ps];
        ps.sort((a, b) => a.place - b.place);
        return ps;
    }

    const sortedParticipants = sortParticipants(participants);

    const winnerId = sortedParticipants[0].id;

    const formatedTime = (date: Date): string => {        
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return (
        <div className="match">
            <div className="match-time">
                {formatedTime(match.start)}
            </div>
            {sortedParticipants.map(p => (
                <Participant key={p.id} participant={p} winner={p.id === winnerId} />
            ))}
        </div>
    )
}
