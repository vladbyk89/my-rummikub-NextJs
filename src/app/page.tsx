import Link from 'next/link';
import './styles/home/style.scss';
import './styles/components/Buttons.scss';
import ProfileLink from '@/components/Home/ProfileLink';

export default function Home() {
	return (
		<main className='mainHome'>
			<ProfileLink />
			<button className='buttonStyleOne'>
				<Link href='/game'>Play Now</Link>
			</button>
		</main>
	);
}
