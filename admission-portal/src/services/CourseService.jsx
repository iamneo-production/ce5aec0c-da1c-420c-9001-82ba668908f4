import axios from 'axios'

<<<<<<< HEAD
const EMPLOYEE_BASE_REST_API_URL = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/courses';
=======
const EMPLOYEE_BASE_REST_API_URL = 'https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/courses';
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

class CourseService{

    getAllCourses(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }
    getCourseById(id) {
        const url = `${EMPLOYEE_BASE_REST_API_URL}/${id}`;
        return axios.get(url);
      }
}
const vari =new CourseService();
export default vari;
