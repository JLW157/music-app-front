import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
    return <>
        <div className="not-found">
            <div className="not-found-main">
                <div className="not-found-main-container">
                    <h2 className="not-found-title">Oo-ops page found</h2>
                    <h2 className="not-found-status">404</h2>
                    <p className="not-found-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam suscipit quo, sunt, possimus ipsa alias necessitatibus temporibus eligendi quaerat voluptate vitae obcaecati aperiam nobis, dignissimos soluta voluptas culpa error!</p>
                    <Link className="not-found-button" to={"/home"}>To Home Page</Link>
                </div>
            </div>
        </div>
    </>
};

export default NotFoundPage;