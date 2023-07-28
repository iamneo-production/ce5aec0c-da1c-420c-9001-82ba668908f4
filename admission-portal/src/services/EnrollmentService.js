import axios from "axios";

const ENROLL_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabbffaabaebdcec.project.examly.io/admin/enrollments';

class EnrollmentService {
  getAllEnrollments() {
    return axios.get(ENROLL_REST_API);
  }

  createEnrollment(enroldetails) {
    return axios.post(ENROLL_REST_API, enroldetails);
  }

  updateEnrollment(enrolid, updatecourse) {
    return axios.put(ENROLL_REST_API + '/' + enrolid, updatecourse, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
    });
  }

  getEnrollmentByID(enrolid) {
    return axios.get(ENROLL_REST_API + '/' + enrolid);
  }

  deleteEnrollment(id){
    return axios.delete(ENROLL_REST_API+'/'+id);
  }

  updateGrade(enrolid,updategrade){
    return axios.put(ENROLL_REST_API+"/grade/"+enrolid,updategrade, {
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
    });
  }
}

const vari =new EnrollmentService();
export default vari;