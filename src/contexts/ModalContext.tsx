import { ReactNode, createContext } from "react";

export interface IModalContext {
  showModal: (showRequest: IShowModalRequest) => void;
  isModalShown: boolean;
  typeOfModal: keyof typeof typeOfModal; // Update the type here
  children: ReactNode,
  closeModal: () => void;
}

export const typeOfModal = {
  "AddToPlaylist" : 0,
  "RemoveFromPlaylist": 1,
};

export interface IShowModalRequest {
  showModal: boolean;
  typeOfModal: keyof typeof typeOfModal; // Update the type here
  children: ReactNode;
}

const defaultValue: IModalContext = {
  showModal: () => {},
  closeModal: () => {},
  isModalShown: false,
  typeOfModal: "AddToPlaylist",
  children: undefined
  // Set the initial value here
};

export const ModalContext = createContext<IModalContext>(defaultValue);