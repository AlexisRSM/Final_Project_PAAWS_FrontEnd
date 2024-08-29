// Highlight sponsered animals (golds)

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SponsoredCard({ pet }) {
  console.log("I am pet object prop in sponsored card component", pet)
  return (
    <>
      <Card className="card">
        <Card.Img
          variant="top"
          src={(pet.animal.images && pet.animal.images[0] && pet.animal.images[0].image_url) || 'https://cdn.britannica.com/86/166986-050-4CEFE5DE/cute-kitten-and-puppy-outdoors-in-grass.jpg'}
          alt={pet.animal.name}
        />
        <Card.Body>
          <Card.Title>{pet.animal.name || 'Adorable little fluffball'}</Card.Title>
          <Card.Text>
            Contributed: € {pet.total_sponsorship_amount} Total  {/* para já acho que deviamos por o simbolo do euro a direita sendo que tmeos os distritos de pt para já -RM */}
          </Card.Text>
          <Link to={`/animalpage/${pet.animal.id} `} state={{ pet }}>
            <Button variant="primary">
              More
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default SponsoredCard;