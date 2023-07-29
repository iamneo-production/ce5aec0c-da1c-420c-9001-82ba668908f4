import axios from "axios";

<<<<<<< HEAD
const COURSE_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap'
=======
const COURSE_REST_API = 'https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap'
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

class CourseService{
  
    getAllCourses(){
        return axios.get(COURSE_REST_API+"/courses");
    }

    createcourse(course){
        return axios.post(COURSE_REST_API+"/courses",course);
    }

    getCourseById(courseId){
        const CourseId = courseId;
<<<<<<< HEAD
        return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/courses/${CourseId}`,courseId);
=======
        return axios.get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/courses/${CourseId}`,courseId);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4
    }

    updatecoursedata(courseId,course){
        const CourseId = courseId;
<<<<<<< HEAD
        return axios.put(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/courses/${CourseId}`, courseId,course);
=======
        return axios.put(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/courses/${CourseId}`, courseId,course);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4
    }

    deletecourse(id){
        const CourseId = id;
<<<<<<< HEAD
        return axios.delete(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/courses/${CourseId}`, id);
=======
        return axios.delete(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/courses/${CourseId}`, id);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4
    }
}
const vari =new CourseService();
export default vari;
