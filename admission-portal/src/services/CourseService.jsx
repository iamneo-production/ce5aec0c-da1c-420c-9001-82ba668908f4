import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'https://8080-effbecaeaabcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/courses';

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
