import { ReactNode, useState } from "react";
import { IShowModalRequest, ModalContext } from "./ModalContext";

interface IModalContextProvider{
    children: ReactNode
}

const ModalContextProvider = ({children}: IModalContextProvider) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [typeOfModal, setTypeOfModal] = useState<"AddToPlaylist" | "RemoveFromPlaylist">("AddToPlaylist");
    const [modalContent, setModalContent] = useState<ReactNode>();

    const changeShowModalState = (showModalRequest: IShowModalRequest) => {
        setShowModal(showModalRequest.showModal);
        
        setTypeOfModal(showModalRequest.typeOfModal);
        
        setModalContent(showModalRequest.children);
    };

    return <>
        <ModalContext.Provider value={{
            showModal: changeShowModalState,
            closeModal: () => setShowModal(false),
            typeOfModal: typeOfModal,
            isModalShown: showModal,
            children: modalContent
        }}>
            {children}
        </ModalContext.Provider>
    </>
};  

export default ModalContextProvider;