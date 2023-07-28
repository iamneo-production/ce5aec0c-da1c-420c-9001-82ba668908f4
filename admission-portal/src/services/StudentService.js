
import axios from 'axios';

class StudentService{

   getStudents(){

     return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students`);

   }

   getStudentById(id){
const userId = id;
  return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`);

   }

   updateStudent(id,student){
    const userId = id;
    return axios.put(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`,student)

  }

  deleteStudent(id) {
    const userId = id;
    return axios.delete(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${userId}`);

  }

  addStudent(student) {

    return axios.post(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students`,student);

  }

}
const vari =new StudentService();
export default vari;









