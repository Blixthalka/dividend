import React from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import { PortfolioIcon } from '../icons/Icons';
import Button from '../components/Button'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="bg-neutral-50 h-screen pt-32">
            <Card className="max-w-xs mx-auto grid gap-5">

                <TextInput
                    setFunction={setEmail}
                    value={email}
                    label={"Email"}
                />
                <TextInput
                    setFunction={setPassword}
                    value={password}
                    label={"Password"}
                    type="password"
                />
                <div className="grid gap-2 grid-cols-2">
                    <Button
                        text="Sign up"
                        design="secondary"
                    />
                    <Button
                        text="Login"
                    />
                </div>


            </Card>
        </div>
    );
}

export default Login;
