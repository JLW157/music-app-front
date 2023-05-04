import { SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import { useState } from "react";
import DisplaySuccess from "./DisplaySuccess";
import DisplayErrors from "./DisplayErrors";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { google, handleAuth, loginAsync } from "../../store/features/authSlice";
import Google from "./Google";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";

export interface ILoginFormValues {
    email: string;
    password: string;
}

const Login = () => {
    const { email } = useParams();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { errors },
        reset } = useForm<ILoginFormValues>({
            mode: "onSubmit",
            defaultValues: {
                email: email
            }
        });


    const [errorsForm, setErrorsForm] = useState<string[]>([]);

    const onSubmit: SubmitHandler<ILoginFormValues> = (data) => {
        dispatch(loginAsync({ Email: data.email, Password: data.password })).unwrap().then(
            (res) => {
                navigate("/");
            },
            (err) => {
                setErrorsForm(err);
            }
        );
        reset();
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
                        <DisplayErrors erorrs={errorsForm} />
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
                                <p>or sign with</p>
                                <div className="google-btn">
                                    <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                                        <Google onGoogleSubmit={onGoogleSubmitClick}/>
                                    </GoogleOAuthProvider>
                                </div>
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