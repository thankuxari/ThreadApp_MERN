import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { CiUser } from 'react-icons/ci';

function Header() {
	const user = useRecoilValue(userAtom);

	return (
		<header>
			<div className="navbar bg-base-100  py-7">
				<div className="flex-auto">
					<a className="btn btn-ghost text-xl font-semibold">
						Velona
					</a>
				</div>
				<div className="flex-auto">
					<Link to={'/'}>
						<img
							src="./public/images/logo.gif"
							className="size-8"
							alt=""
						/>{' '}
					</Link>
				</div>
				<div className="flex-1  gap-3">
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="rounded-full">
								{user && <CiUser className="size-6" />}
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<a className="justify-between">Profile</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
						</ul>
					</div>
					{user && <LogoutButton />}
				</div>
			</div>
		</header>
	);
}

export default Header;
