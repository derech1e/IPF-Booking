import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function SimpleCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const handlePasswordShowClick = () => {
        if (showPassword) {
            setShowPassword(false)
        }
        else[
            setShowPassword(true)
        ]
    }

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    let defaultBody = {
        grant_type: "",
        username: "asdf",
        password: "asdf",
        scope: "",
        client_id: "",
        client_secret: "",
    };

    async function onSubmit(values) {
        try {
            const body = { ...defaultBody, ...values };
            console.log(`POSTing ${JSON.stringify(body, null, 2)}`);
            let res = await signIn("credentials", {
                ...body,
                callbackUrl: router.query.callbackUrl,
            });
        } catch (error) {
            console.log(error)
        }
    }
    if (status === "authenticated") {
        router.push("/", {
            query: {
                callbackUrl: router.query.callbackUrl,
            },
        });
    }

    return (
        <div className="flex w-screen flex-col h-screen items-center justify-center">
            <h1 className="text-center text-2xl pb-12">IPF-Raumbuchung Login</h1>
            <div className="flex justify-center flex-col w-64">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full space-y-2">
                        <label htmlFor="email" className="text-base">Email</label>
                        <input id="username" type="username" className="input-primary" {...register("username")} />
                        <label htmlFor="password" className="text-base">Passwort</label>
                        <div className="flex">
                            <input id="password" type={showPassword ? "text" : "password"} className="input-primary" {...register("password")} />
                            <button type="button" className="button-icon" onClick={handlePasswordShowClick}>{showPassword ? <XMarkIcon className="h-5" /> : <EyeIcon className="h-5" />}</button>
                        </div>
                        {router.query.error &&
                            router.query.error === "CredentialsSignin" && (
                                <div>
                                    Invalid credentials
                                </div>
                            )}
                        <button type="submit" className="button-primary">Anmelden</button>
                    </div>
                </form>
            </div>
        </div >
    );
}