import { Modal, ModalBody, Button } from "reactstrap";

const CustomModal = (props) => {
  const { modalState, setModal, children, className } = props;
  const toggle = () => setModal(!modalState);

  return (
    <Modal isOpen={modalState} toggle={toggle} className={className}>
      <ModalBody>
        <Button close onClick={toggle} />
        {children}
      </ModalBody>
    </Modal>
  );
};

export default CustomModal;
