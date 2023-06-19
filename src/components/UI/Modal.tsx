import { ReactNode, useContext } from "react";
import styles from "./Modal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "../../contexts/ModalContext";
import ReactDOM from "react-dom";
interface IModalProps {
    children: ReactNode
    width?: number;
    height?: number;
}

const Modal = ({ children, width, height }: IModalProps) => {
    const { closeModal } = useContext(ModalContext);

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };

      
    return ReactDOM.createPortal(<>
        <div className={styles["modal-background"]} onClick={e => {
            closeModal();
            e.stopPropagation();
        }}>
            <div className={styles["modal"] } onClick={handleContentClick}>
                <button className={styles["modal-close-btn"]} onClick={() => closeModal()}><FontAwesomeIcon icon={faClose} /></button>
                <div className={styles["modal-content"]}>
                    {children}
                </div>
            </div>
        </div>
    </>, document.getElementById("portal")!);
};

export default Modal;