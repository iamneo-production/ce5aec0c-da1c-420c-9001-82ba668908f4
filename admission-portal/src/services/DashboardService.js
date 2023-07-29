import axios from "axios";

<<<<<<< HEAD
const DASHBOARD_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admin/dashboard';
=======
const DASHBOARD_REST_API = 'https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admin/dashboard';
>>>>>>> 2b87b123a12e53fd50f65a2a574e7e30180b5da4

class DashboardService {

    getTotalCount(){
        return axios.get(DASHBOARD_REST_API);
    }
}
const vari = new DashboardService();
export default vari;