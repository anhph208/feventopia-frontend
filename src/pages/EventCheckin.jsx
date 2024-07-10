import React, { useState, useEffect } from 'react';
import instance from '../utils/cus-axios';

function CheckinTicket() {
    const [ticketId, setTicketId] = useState('');
    const [eventDetailId, setEventDetailId] = useState('');
    const [checkinStatus, setCheckinStatus] = useState('');

    const handleCheckin = async () => {
        setCheckinStatus('Đang kiểm tra...');
        try {
            const response = await instance.get('/ticket/Checkin', {
                params: {
                    ticketId: ticketId,
                    eventDetailId: eventDetailId,
                },
            });

            if (response.status === 200) {
                setCheckinStatus('Check in thành công!');
            } else {
                setCheckinStatus('Check in thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                // Nếu server trả về response
                setCheckinStatus(`Check in thất bại: ${error.response.data.message || 'Lỗi không xác định'}`);
            } else if (error.request) {
                // Nếu request được gửi nhưng không nhận được response
                setCheckinStatus('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
            } else {
                // Lỗi khác
                setCheckinStatus('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    return (
            <div style={{ marginTop: '100px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <h3>Check-in vé</h3>
                <input
                    type="text"
                    value={ticketId}
                    onChange={(event) => setTicketId(event.target.value)}
                    placeholder="Nhập ID vé"
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    value={eventDetailId}
                    onChange={(event) => setEventDetailId(event.target.value)}
                    placeholder="Nhập ID chi tiết sự kiện"
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleCheckin} style={{ padding: '5px 10px' }}>Check In</button>
                {checkinStatus && (
                    <div style={{
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: checkinStatus.includes('thành công') ? '#dff0d8' : '#f2dede',
                        color: checkinStatus.includes('thành công') ? '#3c763d' : '#a94442',
                        border: checkinStatus.includes('thành công') ? '1px solid #d6e9c6' : '1px solid #ebccd1',
                        borderRadius: '5px',
                    }}>
                        {checkinStatus}
                    </div>
                )}
            </div>
    );
}

export default CheckinTicket;
