import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../Google/Google";

const Search = () => {
    return <>
        <h2>Hello it`s search page</h2>
        <div>
            <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                <Google />
            </GoogleOAuthProvider>
        </div>
    </>
};

export default Search;