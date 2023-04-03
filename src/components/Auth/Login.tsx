import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../Google/Google";
import { ChangeEvent, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../../utils/enpoints";
import { IAuthResponse, ILoginRequest } from "../../models/auth/auth.models";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const loginRequest: ILoginRequest = {
            Username: username,
            Password: password
        };

        try {
            const response = await axios.post<IAuthResponse>(loginUrl, loginRequest);
        } catch (error: any) {
            console.log("Something went wrong while authenticating");
        }
    };

    return <div className="login">
        <div className="social-logins">
            <div style={{ textAlign: "center" }}><span>To continue, log in to Music App</span></div>
            <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                <Google />
            </GoogleOAuthProvider>
        </div>
        <div className="login-form-wrapper">
            <form className="form-login" onSubmit={(e) => e.preventDefault()}>
                <div className="form-input">
                    <label>Email address</label>
                    <input onChange={e => setUsername(e.target.value)} type="email" />
                </div>
                <div className="form-input">
                    <label>Password</label>
                    <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <label>Show password: </label>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => setShowPassword(e.target.checked)} type="checkbox"></input>

                <div className="form-input-buttons">
                    <div className="form-input-buttons-back">
                        <button onClick={() => navigate(-1)} type="button"><span>Go back</span></button>
                    </div>
                    <div className="form-input-buttons-back">
                        <button type="submit"><span>Login</span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
};

export default Login;