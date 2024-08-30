import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdoptionStatusCard = ({ adoption, onApprove, onReject, onViewForm }) => {
  // Function to determine the card's background color based on status
  const getCardStyle = () => {
    switch (adoption.adoption_status) {
      case 'Approved':
        return { backgroundColor: '#d4edda' }; // Light green for approved
      case 'Rejected':
        return { backgroundColor: '#f8d7da' }; // Light red for rejected
      case 'Pending':
      default:
        return { backgroundColor: '#fff3cd' }; // Light yellow for pending or default
    }
  };

  return (
    <Card className='card' style={{ marginBottom: '1rem', ...getCardStyle() }}>
      <Card.Img
        variant="top"
        src={adoption.animal.images.length > 0 ? adoption.animal.images[0].image_url : "https://cdn.britannica.com/86/166986-050-4CEFE5DE/cute-kitten-and-puppy-outdoors-in-grass.jpg"}
        alt={adoption.animal.name || "Animal Image"}
        style={{ width: "100%", height: "25vh", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{adoption.animal.name || "Unknown Animal"}</Card.Title>
        <Card.Text>
          ID: {adoption.animal.id || "Unknown"}
        </Card.Text>
        <Card.Text>Status: {adoption.adoption_status}</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button className='primaryButton' onClick={onApprove}>
            <i className="fa-solid fa-check" />
          </Button>
          <Button className='secondaryButton' onClick={onReject}>
            <i className="fa-solid fa-x" />
          </Button>
          <Link to={`/adoptionform_adminview/${adoption.id}`} >
            <Button className='tertiaryButton' onClick={onViewForm}>
              <i className="fa-solid fa-plus" />
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdoptionStatusCard;
