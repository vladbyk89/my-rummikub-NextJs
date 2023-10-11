import '../../styles/Game/style.scss';

export default async function page({ params }: { params: { id: string } }) {
	return (
		<main className='gamePage'>
			<section className='playersArea'>
				<div></div>
				<div></div>
				<div></div>
			</section>
			<section className='gameBoard'>{params.id}</section>
			<section className='playerHand'></section>
		</main>
	);
}
