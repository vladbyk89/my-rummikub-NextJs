import Link from 'next/link';
import './styles/home/style.scss';
import './styles/components/Buttons.scss';
import ProfileLink from '@/components/Home/ProfileLink';

export default function Home() {
	return (
		<main className='mainHome'>
			<ProfileLink />
			<Link href='/game'>
				<button className='buttonStyleOne'>Play Now</button>
			</Link>
		</main>
	);
}
