import React, { useState } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';

const ProductComp = ({ data }) => {
  function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => { return setShow(false); };
    const handleShow = () => { return setShow(true); };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Lihat detail
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{data.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: 'left' }}>
            <b>Kategori </b>
            :
            {data.categories}
            <br />
            <b>Deskripsi </b>
            :
            {data.description}
            <br />
            <b>Tersedia </b>
            :
            {data.max_order_quantity}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>
            Harga : Rp
            {data.normal_price}
          </Card.Text>
          <Example />
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default ProductComp;
