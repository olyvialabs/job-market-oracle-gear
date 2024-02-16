import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MenuItem } from "components/page-display/components/Sidenav";
import { VacancyCreatorModalContent } from "./VacancyCreatorModalContent";

const AddIcon = (
  <svg viewBox="0 0 32 32" width={28} height={28}>
    <circle
      cx="16.0002"
      cy="15.9997"
      r="14.6667"
      fill="#FF9500"
      stroke="#FF9500"
      strokeWidth="1.33333"
    />
    <path
      d="M17.2153 6.54814C17.2153 5.87704 16.6713 5.33301 16.0002 5.33301C15.3291 5.33301 14.785 5.87704 14.785 6.54814L14.785 14.7845L6.54863 14.7845C5.87753 14.7845 5.3335 15.3286 5.3335 15.9997C5.3335 16.6708 5.87753 17.2148 6.54863 17.2148L14.785 17.2148V25.4512C14.785 26.1223 15.3291 26.6663 16.0002 26.6663C16.6713 26.6663 17.2153 26.1223 17.2153 25.4512L17.2153 17.2148H25.4517C26.1228 17.2148 26.6668 16.6708 26.6668 15.9997C26.6668 15.3286 26.1228 14.7845 25.4517 14.7845H17.2153L17.2153 6.54814Z"
      fill="white"
    />
  </svg>
);
function VacancyCreatorModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem
        item={{ content: "New", path: "", icon: AddIcon }}
        onClick={() => onOpen()}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Vacancy</ModalHeader>
          <ModalCloseButton />
          <VacancyCreatorModalContent />
        </ModalContent>
      </Modal>
    </>
  );
}

export { VacancyCreatorModal };
