import React, { useEffect, useState } from "react";
import ApplicationService from "../services/ApplicationService";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { FaDownload } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { saveAs } from 'file-saver';

function Document() {
  const [documents, setDocuments] = useState([]);
  const { admId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ApplicationService.getadmissionById(admId)
      .then((response) => {
        setDocuments(response.data.requiredDocuments);
        console.log(response.data);
        console.log(admId);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [admId]);

  const handleViewClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleDownloadClick = (image) => {
    const imagePath = (`${image}`);
    const fileName = image.substring(image.lastIndexOf('/') + 1);

    const confirmation = window.confirm("Are you sure you want to download this file?");
    if (confirmation) {
      saveAs(imagePath, fileName);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-center mb-3">Uploaded Documents</h1>
      <div className="doccontainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {documents.map((doc, index) => (
          <Card style={{ width: '250px', height: 'auto', overflow: 'hidden', margin: '10px' }} key={index}>
            <div style={{ position: 'relative', paddingTop: '56.25%', height: '300px' }}>
              <Card.Img src={`${doc}`} style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
            </div>
            <Card.Body className="d-flex flex-column">
              <div className="flex-fill d-flex flex-column justify-content-center">
                <Card.Title className="text-center">{doc}</Card.Title> {/* Display the filename as the centered card title */}
              </div>
              <div className="mt-auto d-flex justify-content-between align-items-end">
                <Button variant="primary" onClick={() => handleViewClick(doc)}>View</Button>
                <FaDownload size={25} color="white" style={{ cursor: "pointer", backgroundColor: "blue", borderRadius: "50%", padding: "5px", marginTop: "5px" }} onClick={() => handleDownloadClick(doc)} />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal for displaying the selected image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center" style={{ width: "500px", height: "500px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {selectedImage && (
            <img src={`${selectedImage}`} style={{ maxWidth: "100%", maxHeight: "100%" }} alt={selectedImage} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="primary" onClick={handleGoBack} style={{ marginTop: "10px" }}>
        Go Back
      </Button>
    </div>
  );
}

export default Document;
