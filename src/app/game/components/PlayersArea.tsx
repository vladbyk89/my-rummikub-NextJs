import React from 'react';

import { useAppSelector } from '@/redux/hooks';
import { selectGame } from '@/redux/features/game/gameSlice';
import { ArrowLeftToLine } from 'lucide-react';

// Style
import '../../styles/components/Buttons.scss';

export default function PlayersSection() {
	const gameStore = useAppSelector(selectGame);
	const activePlayerId = gameStore.activePlayer.id;

	return (
		<section className='playersArea'>
			<button
				className='exitButton'
				style={{ position: 'absolute', top: 5, left: 0}}
			>
				<ArrowLeftToLine color='white' />
				Exit
			</button>
			{gameStore.players.map((player, index) => (
				<div
					style={{
						boxShadow:
							activePlayerId === player.id
								? '0 0 10px 5px white'
								: '',
					}}
					key={index}
					className='player'
				>
					{player.userName}
				</div>
			))}
		</section>
	);
}
