import SummaryApi from "../common/SummaryApi"
import Axios from "./Axios"

const fetchUser = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.getProfile,
        })
        return response;
    } catch (error) {
        console.error(error)
    }
}
export default fetchUser;