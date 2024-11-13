import React from 'react';
import SignUpCard from '../components/SignUpCard';
import LoginCard from '../components/LoginCard';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import { Navigate } from 'react-router-dom';

function Auth() {
    const authScreenState = useRecoilValue(authScreenAtom); // Read the atom state

    return <>{authScreenState === 'login' ? <LoginCard /> : <SignUpCard />}</>;
}

export default Auth;
