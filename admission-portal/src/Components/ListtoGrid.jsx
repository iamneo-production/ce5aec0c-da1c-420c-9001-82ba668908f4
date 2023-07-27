import React, { useState, useEffect } from 'react';
import CourseService from '../services/CourseService';

import { Container, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../CSS/CourseStyle.css';

const ListtoGrid = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    CourseService.getAllCourses()
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="main-container">
      <Container className='divcontainer'>
        <nav className="header">LIST OF COURSES</nav>
      </Container>

      <div className="search_bar">
        <Form>
          <InputGroup className="my-3">
            <Form.Control
            className='search_placeholder'
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search course"
            />
          </InputGroup>
        </Form>
      </div>

      <div className="card-container">
        {courses
          .filter((course) => {
            if (search === '') {
              return true;
            } else if (
              course.name
                .toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map((course) => (
            <Card key={course.id} className="card-item" >
              <Card.Body className="text">
                <Card.Text>{course.name}</Card.Text>
                <Card.Text>{course.description}</Card.Text>
                <Link to={`/course/${course.id}`}>
                  <Button variant="primary" className='readmore_btn'>
                    READ MORE
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ListtoGrid;
