// landing page with welcoming + news carousel banner, and at least 3 highlights featuring "Our mission/About us", "Success stories" & "Get to know our animals"

/* import Carousel from 'react-bootstrap/Carousel'; */
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

function Home() {
  return (
    <>
        <div  >
            <Image className='homeBanner' src="/src/images/PAAWS banner.png" alt="a cat and a dog looking to the front with text saying impossible to resist that face" fluid/>
        </div>


        {/* <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <div
                className="d-block w-100"
                src="https://d.newsweek.com/en/full/1898130/dog-cat-under-sheet.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://pics.freeartbackgrounds.com/fullhd/Cat_in_Autumn_Landscape_Background-647.jpg"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://www.adventuredogphotography.com/wp-content/uploads/2023/09/0I7A9276.jpg"
                alt="Third slide"
                />
                <Carousel.Caption>
                <h5>Third slide label</h5>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel> */}

        <div className='homeSections'>
           <Image src="/src/images/patas.png" alt="pawprints" className='pawprints' fluid />
            <div className="meetYourCompaawnion sectionText" >
                <h1 className='sectionTitle'>
                    <Link to="/ourpets" className='sectionTitle'>
                        <p>Meet your</p> <p>compawnion</p>
                    </Link>
                </h1>
            </div>

            <div className="aboutUs sectionText">
                <h1 className='sectionTitle'>
                    <Link to="/" className='sectionTitle'>
                            About Us
                    </Link>
                </h1>
            </div>

            <div className="successStories sectionText">
            <h1 className='sectionTitle'>
                    <Link to="/" className='sectionTitle'>
                        <p>Success</p> <p>Stories</p>
                    </Link>
                </h1>
            </div>
        </div>

        
        

    </>
  );
}

export default Home;