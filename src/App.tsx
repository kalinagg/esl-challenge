import React, { useState, useEffect } from 'react';
import League from './League/League';
import ILeague, { getLeague } from './LeagueService';
import './App.scss';

export default function App() {
	const [league, setLeague] = useState<ILeague>({
		name: '',
		start: '',
		matches: []
	});

	useEffect(() => {
		updateLeague();
	}, []);

	const updateLeague = async () => {
		setLeague(await getLeague(177161));
	}
	
	return (
		<div className="app-container">
			<League league={league} />
		</div>
	)
}
