import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "./Form";
import {setUser} from "../store/slices/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (email: string, password:string) => {
        const auth = getAuth();
        console.log(auth)
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                }));
                navigate('/')
            })
            .catch(console.error);
    }

    return (
        <div>
            <Form
                greetingAction="Register your account"
                link="/login"
                title="Register"
                handleClick={handleRegister}
                actiontype=" Login"
                titleActionText=" Already have an account?"
            />
        </div>
    );
};

export default SignUp;
