import React, { useState, useEffect } from 'react';
import { checkinEventAPI, getEventDetailsAPI } from '../../components/services/userServices';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

function CheckinTicket() {
    const location = useLocation();
    const { eventDetail } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [eventInfo, setEventInfo] = useState(null);
    const [ticketId, setTicketId] = useState('');
    const [eventDetailId, setEventDetailId] = useState('');
    const [eventDetails, setEventDetails] = useState([]);
    const [checkinStatus, setCheckinStatus] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const eventData = await getEventDetailsAPI(eventDetail.id);
                setEventInfo(eventData);
                setEventDetails(eventData.eventDetail);
                if (eventData.eventDetail.length > 0) {
                    setEventDetailId(eventData.eventDetail[0].id);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (eventDetail.id) {
            fetchEventDetails();
        } else {
            setLoading(false);
            setError(new Error("Event ID is missing."));
        }
    }, [eventDetail.id]);

    const handleCheckin = async () => {
        try {
            setLoading(true);
            setError(null);
            await checkinEventAPI(ticketId, eventDetail.eventId);
            setCheckinStatus('Check-in thành công!');
            toast.success('Check-in thành công!');
        } catch (error) {
            setCheckinStatus('Check-in thất bại!');
            setError(error);
            toast.error('Check-in thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            <h3>Check-in vé</h3>
            <input
                type="text"
                value={ticketId}
                onChange={(event) => setTicketId(event.target.value)}
                placeholder="Nhập ID vé"
                style={{ marginBottom: '10px', padding: '5px', width: '500px', textAlign: 'center' }}
            />
            <div className="booking-btn d-flex justify-content-between mt-4">
                <button
                    className="main-btn btn-hover w-100 mt-3"
                    type="button"
                    onClick={handleCheckin}
                >
                    <strong>Check In</strong>
                </button>
            </div>
            {checkinStatus && (
                <p style={{ color: checkinStatus === 'Check-in thành công!' ? 'green' : 'red', marginTop: '10px' }}>
                    {checkinStatus}
                </p>
            )}
        </div>
    );
}

export default CheckinTicket;
