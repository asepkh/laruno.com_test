import { Modal, ModalBody } from "reactstrap";

const CustomModal = (props) => {
  const { modalState, setModal, children, className } = props;
  const toggle = () => setModal(!modalState);

  return (
    <Modal isOpen={modalState} toggle={toggle} className={className}>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default CustomModal;
