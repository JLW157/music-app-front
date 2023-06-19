import styles from "./Loader.module.css";

interface ILoaderProps {
    height: number;
    width: number;
}

const Loader = ({ height, width }: ILoaderProps) => {
    return <>
        <div style={{ height: height, width: width }} className={styles["custom-loader"]} />
    </>
};

export default Loader;