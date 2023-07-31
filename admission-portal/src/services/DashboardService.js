import axios from "axios";

const DASHBOARD_REST_API = 'https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/admin/dashboard';

class DashboardService {

    getTotalCount(){
        return axios.get(DASHBOARD_REST_API);
    }
}
const vari = new DashboardService();
export default vari;