import { ReactNode } from "react";
import { useAppSelector } from "../../store/store";
import { Navigate } from "react-router-dom";
import { IRole } from "../../models/auth.models";

export interface AuthorizedProps {
    requiredRole?: IRole,
    authorized: ReactNode,
    nonAuthorized?: ReactNode,
}

const Authorized = (props: AuthorizedProps) => {
    const { userInfo, isLoggedIn } = useAppSelector(state => state.auth);

    let renderElement: JSX.Element = <></>;
    if (isLoggedIn) {
        if (props.requiredRole && props.requiredRole.role) {
            const index = userInfo?.roles.findIndex(role => role.role === props.requiredRole?.role);
            console.log("found index", index);
            
            if (index! > -1) {
                renderElement = <>{props.authorized}</>
            }
            else {
                renderElement = <>{props.nonAuthorized ? props.nonAuthorized : null}</>
            }
            return <>{renderElement}</>;
        }
        else{
            return <>{props.authorized}</>
        }
    }

    return <Navigate to={"/login"} />
};

export default Authorized;