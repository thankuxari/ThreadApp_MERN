import { Link } from 'react-router-dom';
function Header() {
	return (
		<header>
			<Link to={'/'}>
				<img
					alt="logo"
					className="cursor-pointer size-10 mx-auto mt-6 mb-12"
					src="./public/images/logo.gif"
				/>
			</Link>
		</header>
	);
}

export default Header;
