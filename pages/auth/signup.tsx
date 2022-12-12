import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function SignupCard() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name")} />
                <input type="email" {...register("email")} />
                <input type={showPassword ? "text" : "password"} {...register("password")} />
                <button onClick={() => setShowPassword((showPassword) => !showPassword,)}>Passwort anzeigen</button>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}