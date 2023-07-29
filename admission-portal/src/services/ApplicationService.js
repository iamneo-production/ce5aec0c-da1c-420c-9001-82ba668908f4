import axios from "axios";

<<<<<<< HEAD
const APPLICATION_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions'

class ApplicationService{
    getAllAdmissions(){
        return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions/all`);
=======
const APPLICATION_REST_API = 'https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admissions'

class ApplicationService{
    getAllAdmissions(){
        return axios.get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admissions/all`);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4
    }


    updatestatus(applicationId,data){
        return axios.put(APPLICATION_REST_API + '/' + applicationId,data);
    }

    getadmissionById(admId){
        return axios.get(APPLICATION_REST_API+'/'+admId);
    }
    
    deleteAdmissionById(id){
<<<<<<< HEAD
        return axios.delete(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions/${id}`);
=======
        return axios.delete(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admissions/${id}`);
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4
    }
}

const exp=new ApplicationService()
export default exp