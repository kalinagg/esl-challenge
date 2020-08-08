export default interface ILeague {
    name: string;
    start: Date;
    matches: IMatch[];
}

export interface IMatch {
    id: number;
    start: Date;
    participants: IParticipant[];
}

export interface IParticipant {
    id: number;
    name: string;
    points: number;
    place: number;
}

interface ILeagueResponse {
    id: number;
    name: {full: string};
    timeline: {inProgress: {begin: string}};
}

interface IMatchResponse {
    id: number;
    beginAt: string;
    participants: IParticipantResponse[];
}

interface IParticipantResponse {
    id: number;
    points: number[];
    place: number;
}

interface IContestantsResponse {
    id: number;
    name: string;
}

async function getMatches(leagueId: number): Promise<IMatch[]> {
    const resultsResponse = await fetch(`https://api.eslgaming.com/play/v1/leagues/${leagueId}/results`);
    const results: IMatchResponse[] = await resultsResponse.json();
    
    const contestantsResponse = await fetch(`https://api.eslgaming.com/play/v1/leagues/${leagueId}/contestants`);
    const contestants: IContestantsResponse[] = await contestantsResponse.json();
    
    const contestantsLookup: {[id: number]: IContestantsResponse} = {};
    contestants.forEach(c => {
        contestantsLookup[c.id] = c;
    });

    const matches: IMatch[] = results.map(r => ({
        id: r.id,
        start: new Date(r.beginAt),
        participants: r.participants.map(p => ({
            id: p.id,
            name: contestantsLookup[p.id] ? contestantsLookup[p.id].name : "Account not found",
            points: p.points[0],
            place: p.place
        }))
    }));

    return matches;
}

export async function getLeague(leagueId: number): Promise<ILeague> {
    const response = await fetch(`https://api.eslgaming.com/play/v1/leagues/${leagueId}`);
    const leagueResponse: ILeagueResponse = await response.json();

    return {
        name: leagueResponse.name.full,
        start: new Date(leagueResponse.timeline.inProgress.begin),
        matches: await getMatches(leagueId)
    }
}