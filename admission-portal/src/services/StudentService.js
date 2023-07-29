
import axios from 'axios';

class StudentService{

   getStudents(){

<<<<<<< HEAD
     return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students`);
=======
     return axios.get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/students`);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

   }

   getStudentById(id){
const userId = id;
<<<<<<< HEAD
  return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`);
=======
  return axios.get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/students/${userId}`);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

   }

   updateStudent(id,student){
    const userId = id;
<<<<<<< HEAD
    return axios.put(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`,student)
=======
    return axios.put(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/students/${userId}`,student)
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

  }

  deleteStudent(id) {
    const userId = id;
<<<<<<< HEAD
    return axios.delete(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`);
=======
    return axios.delete(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/students/${userId}`);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

  }

  addStudent(student) {

<<<<<<< HEAD
    return axios.post(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students`,student);
=======
    return axios.post(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/ap/students`,student);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

  }

}
const vari =new StudentService();
export default vari;









