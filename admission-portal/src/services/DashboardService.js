import axios from "axios";

const DASHBOARD_REST_API = 'http://localhost:8080/admin/dashboard';

class DashboardService {

    getTotalCount(){
        return axios.get(DASHBOARD_REST_API);
    }
}
const vari = new DashboardService();
export default vari;