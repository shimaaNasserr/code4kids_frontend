import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
  loading = false,
}) => {
  return (
    <Modal show={isOpen} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete <strong>"{itemName}"</strong>? This
        action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="alert" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
