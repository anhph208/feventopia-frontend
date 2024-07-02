import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { addLocation, fetchLocationById, fetchLocations, updateLocation } from '../components/services/locationServices';
import { handleLogout } from './../utils/tools';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const LocationPage = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [checkSearchValue, setCheckSearchValue] = useState(false);
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const [searchLocationQuery, setSearchLocationQuery] = useState({
        id: "",
        name: "",
    });
    const [error, setError] = useState(null);

    // ADD LOCATION DATA
    const [locationData, setLocationData] = useState({
        locationName: "",
        locationDescription: "",
        capacity: 0,

    })

    // ADD UPDATE LOCATION DATA
    const [updateLocationData, setUpdateLocationData] = useState({
        locationName: "",
        locationDescription: "",
        capacity: 0,
    })

    // GET LOCATIONS
    useEffect(() => {
        const getLocations = async () => {
            try {
                const response = await fetchLocations();
                setLocations(response);
                setFilteredLocation(response);
            } catch (error) {
                setError(error.message);
            }
        };

        getLocations();
    }, []);

    // HANDLE SEARCH LOCATION
    const handleSearchLocation = async (e) => {
        e.preventDefault();

        // filteredLocation.map((location) =>
        //     // console.log(location.locationName.toLowerCase().includes(searchLocationQuery.name.toLowerCase().trim()),
        //         console.log(location.id.toLowerCase().includes(searchLocationQuery.id.toLowerCase().trim()))
        //     )

        const filteredList = locations.filter((location) =>
            location.locationName.toLowerCase().includes(searchLocationQuery.name.toLowerCase().trim()) &&
            location.id.toLowerCase().includes(searchLocationQuery.id.toLowerCase().trim()),
        )

        setFilteredLocation(filteredList)
    }

    // HANDLE RESET SEARCH
    const handleResetSearch = (e) => {
        e.preventDefault();
        setFilteredLocation(locations);
        setSearchLocationQuery({
            id: "",
            name: "",
        });
    }

    // HANDLE SUMBIT ADD LOCATION FORM
    const handleAddLoc = async (e) => {
        e.preventDefault();
        await addLocation(locationData);
        sessionStorage.setItem("successMessage", "Tạo địa điểm thành công");
    }

    // HANDLE GET LOCATION BY ID
    const handleGetLocation = async (id) => {
        const response = await fetchLocationById(id);

        setUpdateLocationData(prevData => ({
            ...prevData,
            id: response.id,
            locationName: response.locationName,
            locationDescription: response.locationDescription,
            capacity: response.capacity,
        }))

        handleShowUpdate();
    }

    // HANDLE UPDATE LOCATION DATA
    const handleUpdateLoc = async (e) => {
        e.preventDefault();
        await updateLocation(updateLocationData);
        sessionStorage.setItem("successMessage", "Cập nhật địa điểm thành công");
    }

    // GET SUCCESS MESSAGE
    useEffect(() => {
        const successMessage = sessionStorage.getItem("successMessage");
        if (successMessage) {
            toast.success(successMessage);
            sessionStorage.removeItem("successMessage");
        }
    }, [])

    return (
        <div className='py-5'>
            <Container>
                <div className="hero-banner">
                    <Typography variant="h2" component="h2" gutterBottom>
                        Địa điểm đăng ký sự kiện
                    </Typography>
                </div>
                <form className="d-flex justify-content-between mb-4 mt-3" onSubmit={handleSearchLocation}>
                    <div className='d-flex gap-3'>
                        <div>
                            <label htmlFor="locationID">Mã số địa điểm: </label>
                            <input className='ms-2 p-2' type="text" id="locationID" name="locationID"
                                value={searchLocationQuery.id}
                                onChange={(e) => setSearchLocationQuery({ ...searchLocationQuery, id: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="locationName">Tên địa điểm: </label>
                            <input className='ms-2 p-2' type="text" id="locationName" name="locationName"
                                value={searchLocationQuery.name}
                                onChange={(e) => setSearchLocationQuery({ ...searchLocationQuery, name: e.target.value })} />
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <button className="ps-3 pe-3 btn btn-danger" type='button' onClick={handleResetSearch}>X</button>
                        <button type="submit" className='p-2 btn btn-primary'>Tìm kiếm</button>
                    </div>
                </form>
                <Button variant="primary p-2 mb-3" onClick={handleShow}>
                    Tạo địa điểm mới
                </Button>
                <Grid container spacing={4}>
                    {filteredLocation.map(location => (
                        <Grid item xs={12} sm={6} md={4} key={location.id}>
                            <Card onClick={() => handleGetLocation(location.id)}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {location.locationName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {location.locationDescription}
                                    </Typography>
                                    <Typography variant="body2">
                                        Capacity: {location.capacity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>


            {/* ADD LOCATION MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm địa điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-3' >
                        <div className="mb-3">
                            <label htmlFor="locationName" className="form-label">Tên địa điểm</label>
                            <input type="text" className="form-control" id="locationName" aria-describedby="locationName"
                                value={locationData.locationName}
                                onChange={(e) => setLocationData({ ...locationData, locationName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="locationDescription" className="form-label">Mô tả</label>
                            <input type="text" className="form-control" id="locationDescription"
                                value={locationData.locationDescription}
                                onChange={(e) => setLocationData({ ...locationData, locationDescription: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Sức chứa</label>
                            <input type="number" className="form-control" id="capacity"
                                value={locationData.capacity}
                                onChange={(e) => setLocationData({ ...locationData, capacity: parseInt(e.target.value) })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button type='button' variant="primary" onClick={handleAddLoc} >
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* UPDATE LOCATION MODAL */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật địa điểm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-3' >
                        <div className="mb-3">
                            <label htmlFor="locationName" className="form-label">Tên địa điểm</label>
                            <input type="text" className="form-control" id="locationName" aria-describedby="locationName"
                                value={updateLocationData.locationName}
                                onChange={(e) => setUpdateLocationData({ ...updateLocationData, locationName: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="locationDescription" className="form-label">Mô tả</label>
                            <input type="text" className="form-control" id="locationDescription"
                                value={updateLocationData.locationDescription}
                                onChange={(e) => setUpdateLocationData({ ...updateLocationData, locationDescription: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">Sức chứa</label>
                            <input type="number" className="form-control" id="capacity"
                                value={updateLocationData.capacity}
                                onChange={(e) => setUpdateLocationData({ ...updateLocationData, capacity: parseInt(e.target.value) })} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='button' variant="secondary" onClick={handleCloseUpdate}>
                        Hủy
                    </Button>
                    <Button type='button' variant="primary" onClick={handleUpdateLoc}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LocationPage;


