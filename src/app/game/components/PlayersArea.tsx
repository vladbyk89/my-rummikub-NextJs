import React from 'react';

// Redux
import { useAppSelector } from '@/redux/hooks';
import { selectGame } from '@/redux/features/game/gameSlice';

// Nextjs
import { useRouter } from 'next/navigation';

// Third party imports
import { ArrowLeftToLine } from 'lucide-react';

// Style
import '../../styles/components/Buttons.scss';

export default function PlayersSection() {
	const gameStore = useAppSelector(selectGame);
	const activePlayerId = gameStore.activePlayer.id;

	const router = useRouter();

	return (
		<section className='playersArea'>
			<button className='exitButton' onClick={() => router.push('/')}>
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
