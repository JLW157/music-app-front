// Other imports

import { ModalContext } from "../../contexts/ModalContext";
import ModalContextProvider from "../../contexts/ModalContextProvider";
import SearchPage from "./SearchPage";

const SearchPageWrapper = () => {
  // Add any necessary state or logic here
  return (
    <ModalContextProvider>
      <SearchPage />
    </ModalContextProvider>
  );
};

export default SearchPageWrapper;