import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../store/store";
import { google } from "../../store/features/authSlice";

const Google = () => {
    const dispatch = useAppDispatch();

    return <GoogleLogin
    onSuccess={(resposne) => {
        console.log(resposne);
        if (resposne.credential) {
            dispatch(google({IdToken: resposne.credential}))
        }
    }}
    onError={() => {
        console.log("Error")
    }}/>
};

export default Google;