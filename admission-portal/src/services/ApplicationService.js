import axios from "axios";

const APPLICATION_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions'

class ApplicationService{
    getAllAdmissions(){
        return axios.get(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions/all`);
    }


    updatestatus(applicationId,data){
        return axios.put(APPLICATION_REST_API + '/' + applicationId,data);
    }

    getadmissionById(admId){
        return axios.get(APPLICATION_REST_API+'/'+admId);
    }
    
    deleteAdmissionById(id){
        return axios.delete(`https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admissions/${id}`);
    }
}

const exp=new ApplicationService()
export default exp