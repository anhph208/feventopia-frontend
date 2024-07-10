import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { fetchLocationById } from '../components/services/locationServices';

const LocationDetailPage = () => {
    const { id } = useParams(); // Assuming you're using React Router
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
return (
    <div className='wrapper'>
        <div className='hero-banner'>
        <h1>{id}</h1>

        </div>
        
    </div>
    
    
)
    // useEffect(() => {
    //     const getLocation = async () => {
    //         try {
    //             const data = await fetchLocationById(id);
    //             setLocation(data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     getLocation();
    // }, [id]);

    // if (error) {
    //     return (
    //         <Container>
    //             <Typography variant="body1" color="error">
    //                 {error}
    //             </Typography>
    //         </Container>
    //     );
    // }

    // if (!location) {
    //     return (
    //         <Container>
    //             <Typography variant="body1">Loading...</Typography>
    //         </Container>
    //     );
    // }

    // return (
    //     <Container>
    //         <Card>
    //             <CardContent>
    //                 <Typography variant="h4" component="div">
    //                     {location.locationName}
    //                 </Typography>
    //                 <Typography variant="body2" color="textSecondary">
    //                     {location.locationDescription}
    //                 </Typography>
    //                 <Typography variant="body2">
    //                     Capacity: {location.capacity}
    //                 </Typography>
    //             </CardContent>
    //         </Card>
    //     </Container>
    // );
};

export default LocationDetailPage;
