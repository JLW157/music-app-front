import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import { useState } from "react";
import DisplaySuccess from "./DisplaySuccess";
import DisplayErrors from "./DisplayErrors";
import { useParams } from "react-router-dom";

export interface ILoginFormValues {
    username: string;
    email: string;
    password: string;
}

const Login = () => {
    const {email} = useParams();

    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<ILoginFormValues>({
            mode: "onSubmit",
            defaultValues: {
                email: email
            }
        });


    const [errorsForm, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | undefined>();

    const onSubmit: SubmitHandler<ILoginFormValues> = (data) => {
        alert(`Your name ${data.username}`);
        console.log("Your data here", data);
        reset();
    };

    return <>
        <div className="form-card">
            <div className="form-row">
                <div className="form-img-wrapper">
                    <div className="form-image">
                        <img src="./img/logo-no-background.png" alt="" />
                    </div>
                </div>
                <div className="form-wrapper">
                    <div className="form">
                        <h3 className="form-title">Member login</h3>
                        <DisplaySuccess message={successMessage}/>
                        <DisplayErrors erorrs={errorsForm}/>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <div className="input-box">
                                    <input {...register('email', {
                                        required: "Email is required!",
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Please enter valid email"
                                        }
                                    })} type="text" required />
                                    <span>Email</span>
                                </div>
                                {errors?.email && <div style={{ color: "red" }}>{errors.email.message}</div>}
                            </div>

                            <div className="form-control">
                                <div className="input-box">
                                    <input {...register('password', {
                                        required: "Password is required!",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
                                            message: "Please enter valid password"
                                        }
                                    })} type="text" required />
                                    <span>Password</span>
                                </div>
                                {errors?.password && <div style={{ color: "red" }}>{errors.password.message}</div>}
                            </div>

                            <div className="form-btns">
                                <button className="form-btn" type="submit">Login</button>
                            </div>
                        </form>
                        <div className="form-register-link" style={{ "textAlign": "center" }}>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Login;