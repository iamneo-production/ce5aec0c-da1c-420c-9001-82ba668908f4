import React, { useEffect, useState } from 'react'
import CourseService from '../services/MCourseService';
import {Link, useNavigate, useParams } from 'react-router-dom';
// import "./AddCourses.css";

const AddCourses = () => {

    const [course,SetCourse] = useState({
        coursename:"",
        description:"",
        prerequisites:"",
        credits:""
    })

    const history = useNavigate();
    const {id} = useParams();

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        
        SetCourse({ ...course, [name]: value });
      }

      const saveOrUpdateCourse =(e) =>{
        e.preventDefault();

        if(id){
            CourseService.updatecoursedata(id,course).then((response)=>{
                history('/listcourses');
            }).catch(error=>{
                console.log(error);
            })
        }
        else{
        CourseService.createcourse(course).then((response) =>{

            console.log(response.data);

            history('/listcourses');

        }).catch(error =>{
            console.log(error);
        })
    }

      }

      useEffect(() =>{
        CourseService.getCourseById(id).then((response) =>{
            SetCourse(response.data);
        }).catch(error =>{
            console.log(error);
        })
    },[id])

      const title = () =>{
        if(id){
            return <h2 className='text-center'>Update Course Details</h2>
        }
        else{
            return <h2 className='text-center'>Add Course</h2>
        }

    }

  return (
    <div className="bg-color">
        <br></br>
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {title()}
                    <div className="card-body">
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-lable'>Course Name :</label>
                                <input
                                type='text'
                                placeholder='Enter Course Name'
                                name='name'
                                className='form-control'
                                value={course.name}
                                onChange={handleChange}>
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-lable'>Description :</label>
                                <textarea
                                type='text'
                                placeholder='Enter description'
                                name='description'
                                className='form-control'
                                value={course.description}
                                onChange={handleChange}>
                                </textarea>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-lable'>Prerequisites :</label>
                                <input
                                type='text'
                                placeholder='Enter Prerequisites'
                                name='prerequisites'
                                className='form-control'
                                value={course.prerequisites}
                                onChange={handleChange}>
                                </input>
                            </div>
                            
                            <div className='form-group mb-2'>
                                <label className='form-lable'>Credits :</label>
                                <input
                                type='text'
                                placeholder='Enter Credits'
                                name='credits'
                                className='form-control'
                                value={course.credits}
                                onChange={handleChange}>
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveOrUpdateCourse(e)}>Submit</button>
                            {/* <button className='btn btn-danger'>Cancel</button> */}
                            <Link to="/listcourses" className="btn btn-danger" style={{ marginLeft: "10px" }}>cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCourses
