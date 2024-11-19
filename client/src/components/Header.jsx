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
                    <Link
                        to={'/patchnotes'}
                        className="btn btn-ghost text-xl font-semibold"
                    >
                        Velona <span className="badge badge-primary">Beta</span>
                    </Link>
                </div>
                <div className="flex-auto">
                    <Link to={`/`}>
                        <img
                            src="/public/images/logo.gif"
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
                                {user && (
                                    <Link to={`/${user.user?.username}`}>
                                        <img
                                            className="size-24 rounded-full"
                                            src={
                                                user.user.profilePic
                                                    ? `http://localhost:5000/${user.user?.profilePic}`
                                                    : './public/images/no_user_profile_pic.jpg'
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
