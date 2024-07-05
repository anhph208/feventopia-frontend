import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RechargeModal = ({ show, handleClose, handleRecharge }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRecharge(amount);
    setAmount(""); // Reset amount after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Recharge Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="model-content">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Button variant="light" type="submit" className="mt-3 btn-light">
              Recharge
            </Button>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="btn-light">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RechargeModal;
