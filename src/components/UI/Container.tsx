import { ReactNode } from "react";
import classes from "./Contianer.module.css";

const Container = (props: containerProps) => {
    let width = props.width ? props.width : "";

    return <div style={{maxWidth: width}} className={classes.container}>
        {props.children}
    </div>
};

export default Container;

interface containerProps {
    children: ReactNode;
    width?: number;
}