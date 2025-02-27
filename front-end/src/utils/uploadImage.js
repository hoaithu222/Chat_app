import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("file", image);
        const response = await Axios(
            {
                ...SummaryApi.uploadMedia,
                data: formData,
            }
        )
        return response;
    } catch (error) {
        return error;
    }
}
export default uploadImage;