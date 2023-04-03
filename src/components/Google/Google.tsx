import { constants } from "buffer";
import { GoogleLogin } from "@react-oauth/google";
import { createConstructSignature } from "typescript";
import { resolveSoa } from "dns";
import axios from "axios";

const Google = () => {
    const handleGoogleLoginSuccess = async (response: any) => {
        console.log("Success login!", response);
        const idToken: string = response.credential;

        console.log(idToken);
        try {
            var token = await axios.post("https://localhost:7143/api/account/google", { IdToken: idToken });
            console.log(token.data.token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleLoginFailure = () => {
        console.log("Error from google: ");
    };

    return <>
        <div>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
            />
        </div>

    </>

};

export default Google;