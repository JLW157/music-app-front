import { SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { google, registerAsync } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./Google";
import { registerCredentionals } from "../../models/auth.models";

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
    const navigate = useNavigate();

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
        navigate(`/emailsent/${data.email}`);
    };

    
    const onGoogleSubmitClick = (resposne: CredentialResponse) => {
        dispatch(google({IdToken: resposne.credential})).unwrap().then(
            (res) => {
                navigate("/");
            },
            (err) => {
                setErrorsForm(err);
            }
        );

        reset();
    }


    return <>
        <div className={styles["form-card"]}>
            <div className={styles["form-row"]}>
                <div className={styles["form-img-wrapper"]}>
                    <div className={styles["form-image"]}>
                        <img src="./img/logo-no-background.png" alt="" />
                    </div>
                </div>
                <div className={styles["form-wrapper"]}>
                    <div className={styles["form"]}>
                        <h3 className={styles["form-title"]}>Register form</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles["form-control"]}>
                                <div className={styles["input-box"]}>
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

                            <div className={styles["form-control"]}>
                                <div className={styles["input-box"]}>
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
                                <p>or sign with</p>
                                <div className="google-btn">
                                    <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                                        <Google onGoogleSubmit={onGoogleSubmitClick}/>
                                    </GoogleOAuthProvider>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Register;