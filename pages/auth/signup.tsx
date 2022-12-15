import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { passwordStrength } from 'check-password-strength'
import { Transition } from "@headlessui/react";

export default function SignupCard() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordSafety, setPasswordSafety] = useState(0);
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm();

    async function onSubmit(values) {
        try {
            const body = { ...values };
            console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
            const res = await fetch(`/api/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            console.log(res)
            reset();
            router.push(
                `signin${router.query.callbackUrl
                    ? `?callbackUrl=${router.query.callbackUrl}`
                    : ""
                }`,
            );
        } catch (error) {
            console.error(error);
        }
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
        setPasswordSafety(passwordStrength(event.target.value).id);
    }

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex flex-col text-center w-96">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="input-primary" type="text" {...register("name")} value={username} onChange={(e) => handleUsernameChange(e)} />
                    <input className="input-primary" type={showPassword ? "text" : "password"} {...register("password")} value={password} onChange={(e) => handlePasswordChange(e)} />
                    <button type="button" onClick={() => setShowPassword((showPassword) => !showPassword,)}>{showPassword ? "Passwort verbergen" : "Passwort anzeigen"}</button>
                    <Transition show={passwordSafety < 2} enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="py-2 text-red-500">
                            Passwort muss mind. 8 Zeichen und mind. 1 Sonderzeichen besitzen
                        </div>
                    </Transition>
                    <button className="button-primary w-full" disabled={passwordSafety >= 2 && username.trim().length > 0 ? false : true} type="submit">Sign up</button>
                </form>
            </div >
        </div >
    );
}