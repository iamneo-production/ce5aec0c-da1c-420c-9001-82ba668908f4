import axios from "axios";

const APPLICATION_REST_API = 'http://localhost:8080/admissions'

class ApplicationService{
    getAllAdmissions(){
        return axios.get(`http://localhost:8080/admissions/all`);
    }


    updatestatus(applicationId,data){
        return axios.put(APPLICATION_REST_API + '/' + applicationId,data);
    }

    getadmissionById(admId){
        return axios.get(APPLICATION_REST_API+'/'+admId);
    }
    
    deleteAdmissionById(id){
        return axios.delete(`http://localhost:8080/admissions/${id}`);
    }
}

const exp=new ApplicationService()
export default exp