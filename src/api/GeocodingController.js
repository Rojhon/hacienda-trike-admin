import axios from 'axios';
import { GOOGLE_MAPS_APIKEY } from '../constants/APIKeyConstants';

export const reverseGeocoding = async (latitude, longitude) => {
    try {
        const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&key=${GOOGLE_MAPS_APIKEY}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}
