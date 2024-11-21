import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import userAtom from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { CiUser } from 'react-icons/ci';

function Header() {
    const user = useRecoilValue(userAtom);
    return (
        <header>
            <div className="navbar bg-base-100 py-7">
                <div className="flex-auto">
                    <Link
                        to={'/patchnotes'}
                        className="btn text-sm btn-ghost md:text-xl font-semibold"
                    >
                        Velona{' '}
                        <span className="badge badge-primary hidden md:inline">
                            Beta
                        </span>
                    </Link>
                </div>
                <div className="flex-auto">
                    <Link to={`/`}>
                        <img
                            src="/assets/logo-DKkp2uJ2.gif"
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
                            <div className="size-8 md:size-12 rounded-full">
                                {user && (
                                    <Link to={`/${user.user?.username}`}>
                                        <img
                                            src={
                                                user.user.profilePic
                                                    ? user.user?.profilePic
                                                    : '/images/no_user_profile_pic.jpg'
                                            }
                                            alt="User Profile Image"
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {user && <LogoutButton />}
                </div>
            </div>
        </header>
    );
}

export default Header;
