import { SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import "./Login.css";
import { registerCredentionals } from "../../models/auth-models";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { registerAsync } from "../../store/features/authSlice";

const Register = () => {
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting},
        reset } = useForm<registerCredentionals>({
            mode: "onSubmit"
        });

    const dispatch = useAppDispatch();
    const [errorsForm, setErrorsForm] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | undefined>();


    const onSubmit: SubmitHandler<registerCredentionals> = (data) => {
        alert(`Your name ${data.username}`);
        console.log("Your data here", data);
        dispatch(registerAsync({ Email: data.email, Username: data.username, Password: data.password })).unwrap().then(
            (res) => {
                setSuccessMessage(res)
                console.log("Okey in login", res);
                if (errorsForm.length > 0) {
                    setErrorsForm([]);
                }
            },
            (err) => {
                setSuccessMessage(undefined);
                setErrorsForm(err);
            }
        );
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
                        <h3 className="form-title">Register form</h3>
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
                                    <input {...register('username', {
                                        required: "Username is required!",
                                    })} type="text" required />
                                    <span>Username</span>
                                </div>
                                {errors?.username && <div style={{ color: "red" }}>{errors.username.message}</div>}
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
                                <button className="form-btn" disabled={isSubmitting} type="submit">Register</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Register;