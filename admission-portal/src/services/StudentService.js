
import axios from 'axios';

class StudentService{

   getStudents(){

     return axios.get(`http://localhost:8080/ap/students`);

   }

   getStudentById(id){
const userId = id;
  return axios.get(`http://localhost:8080/ap/students/${userId}`);

   }

   updateStudent(id,student){
    const userId = id;
    return axios.put(`http://localhost:8080/ap/students/${userId}`,student)

  }

  deleteStudent(id) {
    const userId = id;
    return axios.delete(`http://localhost:8080/ap/students/${userId}`);

  }

  addStudent(student) {

    return axios.post(`http://localhost:8080/ap/students`,student);

  }

}
const vari =new StudentService();
export default vari;









