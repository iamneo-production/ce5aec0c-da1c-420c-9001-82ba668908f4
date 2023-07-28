import axios from "axios";

const COURSE_REST_API = 'https://8080-aadabecdedafebbdadbedabbffaabaebdcec.project.examly.io//ap'

class CourseService{
  
    getAllCourses(){
        return axios.get(COURSE_REST_API+"/courses");
    }

    createcourse(course){
        return axios.post(COURSE_REST_API+"/courses",course);
    }

    getCourseById(courseId){
        const CourseId = courseId;
        return axios.get(`https://8080-aadabecdedafebbdadbedabbffaabaebdcec.project.examly.io//ap/courses/${CourseId}`,courseId);
    }

    updatecoursedata(courseId,course){
        const CourseId = courseId;
        return axios.put(`https://8080-aadabecdedafebbdadbedabbffaabaebdcec.project.examly.io//ap/courses/${CourseId}`, courseId,course);
    }

    deletecourse(id){
        const CourseId = id;
        return axios.delete(`https://8080-aadabecdedafebbdadbedabbffaabaebdcec.project.examly.io//ap/courses/${CourseId}`, id);
    }
}
const vari =new CourseService();
export default vari;
