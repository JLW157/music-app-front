import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EmailSent = () => {
    const {email} = useParams();

    return <>
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Account confirmation</h2>
                </div>
                <div className="card-body">
                    <p>An email with your account has been sent to your email <b>{email}</b></p>
                    
                    <div className="card-btn">
                        <Link to={`/login/${email}`}>Proceed</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default EmailSent;