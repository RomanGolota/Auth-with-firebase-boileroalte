import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import Form from "./Form";
import {setUser} from "../store/slices/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (email, password) => {
        const auth = getAuth();
        console.log(auth)
        signInWithEmailAndPassword (auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/')
            })
            .catch(console.error);
    }

    return (
        <div>
            <Form
                greetingAction="Sign in to your account"
                link="/register"
                title="Sign in"
                handleClick={handleLogin}
                actiontype=" Register"
                titleActionText=" Don't have an account?"
            />
        </div>
    );
};

export default SignUp;
