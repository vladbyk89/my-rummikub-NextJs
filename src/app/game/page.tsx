'use client';

// ** Styles
import '../styles/Game/style.scss';
import '../styles/components/Buttons.scss';
import style from '../global.module.css';

// ** Custom components
import Board from './components/Board';
import PlayersSection from './components/PlayersArea';

// ** redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';
import { selectGame, gameActions } from '@/redux/features/game/gameSlice';

// ** Types
import ActivePlayerSection from './components/ActivePlayerSection';

// Third party imports
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import { getWindowDimensions } from '@/helpers/screenDimentions';
import { useWindowDimensions } from '@/hooks/getDimentions';

export default function GamePage() {
	const [isValidScreen, setIsValidScreen] = useState(true);
	const { height, width } = useWindowDimensions();

	// Hooks
	const dispatch = useAppDispatch();
	const { activePlayer, players, gameOver } = useAppSelector(selectGame);
	const store = useAppSelector(selectGame);

	const saveGameToDB = async () => {
		try {
			await axios.post('/api/game/save-game-data', store);
		} catch (error: any) {
			console.log('Save failed', error.message);
		}
	};

	useEffect(() => {
		if (players.length == 0) {
			const fakePlayers = ['vladb89', 'riri96', 'ollie21'];
			dispatch(gameActions.createGame(fakePlayers));
		} else {
			// console.log(store);
			// save game to db
		}
	}, [players, dispatch]);

	useEffect(() => {
		if (!width || !height) return;

		if (width < height * 1.5) {
			setIsValidScreen(false);
		}

		if (width >= height * 1.5 || (width >= 1400 && height >= 800)) {
			setIsValidScreen(true);
		}
	}, [height, width]);

	return gameOver.isOver ? (
		<div className='gameOverPage'>
			The Winner is: {gameOver.winner.userName}
		</div>
	) : isValidScreen ? (
		<main className='gamePage'>
			<PlayersSection />
			<ActivePlayerSection activePlayer={activePlayer} />
			<Board />
		</main>
	) : (
		<main className={style.flexCenterColumn} style={{ gap: 50 }}>
			<h1 style={{ textAlign: 'center' }}>
				Screen is not in valid proportions
			</h1>
			<h2 style={{ textAlign: 'center' }}>Rotate screen if possible</h2>
			<RefreshCcw size={48} />
		</main>
	);
}
