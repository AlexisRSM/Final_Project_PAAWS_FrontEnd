// Should feature a Card for each animal + left-side menu with labels for filtering (species, gender, life stage, location)

// Could maybe add a sort option above?
//You wish a sort option?  ---Hold my fries -RM

// Should we have a cap for animals that are already being sponsored?
//CAP ? 🧢 🥸

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FilterSection from '../components/FilterSection';
import RegularCard from '../components/RegularCard';
//Added by -RM
import { useAPI } from '../pages/Context/Context';
import React, { useState, useEffect } from 'react';
import AnimalCard from '../components/RegularCard';

function AnimalSearch() {
    const { listAnimals } = useAPI();
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [filters, setFilters] = useState({
        species: {},
        gender: {},
        life_stage: {},
        known_ilness: {},
        location: '',
    });
    const [sortOption, setSortOption] = useState('name');

    // Fetch animals on component mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalData = await listAnimals();
                setAnimals(animalData);
                setFilteredAnimals(animalData); // Initialize with all animals
            } catch (error) {
                console.error('Failed to fetch animals:', error);
            }
        };
        fetchAnimals();
    }, [listAnimals]);

    // Apply filters and sorting
    useEffect(() => {
        let result = animals;

        // Apply species filter if any species filter is active
        if (Object.values(filters.species).some(Boolean)) {
            result = result.filter(animal => filters.species[animal.species]);
        }

        // Apply gender filter if any gender filter is active
        if (Object.values(filters.gender).some(Boolean)) {
            result = result.filter(animal => filters.gender[animal.gender]);
        }

        // Apply life stage filter if any life stage filter is active
        if (Object.values(filters.life_stage).some(Boolean)) {
            result = result.filter(animal => filters.life_stage[animal.life_stage]);
        }

        // Apply known illness filter if any known illness filter is active
        if (Object.values(filters.known_ilness).some(Boolean)) {
            result = result.filter(animal => filters.known_ilness[animal.known_ilness]);
        }

        // Apply location filter if location is selected
        if (filters.location) {
            result = result.filter(animal => animal.location === filters.location);
        }

        // Apply sorting
        result = result.sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortOption === 'age') {
                return a.age - b.age;
            }
            return 0;
        });

        // Update the state with the filtered and sorted result
        setFilteredAnimals(result);
    }, [filters, sortOption, animals]);

    return (
        <Container fluid>
            <Row>
                <Col lg="3">
                    <FilterSection filters={filters} setFilters={setFilters} />
                </Col>
                <Col lg="9">
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="sortOption">Sort By: </label>
                        <select id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="age">Age</option>
                        </select>
                    </div>
                    <Row>
                        {filteredAnimals.length > 0 ? (
                            filteredAnimals.map((animal) => (
                                <Col lg="4" key={animal.id}>
                                    <AnimalCard animal={animal} />
                                </Col>
                            ))
                        ) : (
                            <Col lg="12">
                                <p>No animals match the selected filters.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AnimalSearch;