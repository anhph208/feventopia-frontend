import { toast } from "react-toastify";
import config from "../../utils/cus-axios"; // Import your API configuration

export const fetchLocations = async () => {
    try {
        const response = await config.get("/location");
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchLocationById = async (id) => {
    try {
        const response = await config.get(`/location/GetLocationById?id=${id}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const addLocation = async (locationData) => {
    try {
        const response = await config.post("/location/AddLocation", locationData);
        if (response.status >= 200 && response.status < 300) {
            window.location.reload();
            return response.data;
        }
    } catch (error) {
        const errors = error.response.data.errors;
        const errorMessages = [];

        // Iterate over each error type and log it as an array
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                errorMessages.push(errors[key]);
            }
        }

        console.log(errorMessages);
        toast.error(errorMessages.flat().join(' '));
    }
};

export const updateLocation = async (updateLocation) => {
    try {
        const response = await config.put(`/location/UpdateLocation?id=${updateLocation.id}`, updateLocation);
        if (response.status >= 200 && response.status < 300) {
            window.location.reload();
            return response.data;
        }
    } catch (error) {
        const errors = error.response.data.errors;
        const errorMessages = [];

        // Iterate over each error type and log it as an array
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                errorMessages.push(errors[key]);
            }
        }

        console.log(errorMessages);
        toast.error(errorMessages.flat().join(' '));
    }
}
