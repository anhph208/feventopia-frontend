import React, { useState } from 'react';
import instance from '../utils/cus-axios';

function EventAnalysis() {
    const [eventId, setEventId] = useState('');
    const [analysisData, setAnalysisData] = useState(null);
    const [analysisStatus, setAnalysisStatus] = useState('');

    const getEventAnalysis = async () => {
        setAnalysisStatus('Đang tải dữ liệu phân tích...');
        try {
            const response = await instance.get(`/event-analysis/${eventId}`);

            if (response.status === 200) {
                setAnalysisData(response.data);
                setAnalysisStatus('Đã tải dữ liệu phân tích thành công!');
            } else {
                setAnalysisStatus('Không thể tải dữ liệu phân tích. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                setAnalysisStatus(`Lỗi khi tải dữ liệu: ${error.response.data.message || 'Lỗi không xác định'}`);
            } else if (error.request) {
                setAnalysisStatus('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
            } else {
                setAnalysisStatus('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    const downloadCSV = () => {
        if (!analysisData) {
            alert('Không có dữ liệu để tải.');
            return;
        }

        const selectedData = {
            "Ticket sold": analysisData.numTicketSold,
            "Ticket checkin": analysisData.numTicketCheckedIn,
            "Income": analysisData.ticketIncome,
            "Stall sold": analysisData.numStallSold,
            "Initial Capital": analysisData.initialCapital,
            "Sponsor capital": analysisData.sponsorCapital,
            "Actual expense": analysisData.actualExpense,
            "Average feedback": analysisData.averageFeedback
        };

        const headers = Object.keys(selectedData).join(',');
        const values = Object.values(selectedData).join(',');
        const csvContent = `data:text/csv;charset=utf-8,${headers}\n${values}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'event_analysis.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Phân tích sự kiện</h1>
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                <input
                    type="text"
                    value={eventId}
                    onChange={(event) => setEventId(event.target.value)}
                    placeholder="Nhập ID sự kiện"
                    style={{ marginRight: '10px', padding: '10px', width: '60%' }}
                />
                <button onClick={getEventAnalysis} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Lấy phân tích
                </button>
                <button onClick={downloadCSV} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Tải dữ liệu
                </button>
                {analysisStatus && (
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        backgroundColor: analysisStatus.includes('thành công') ? '#dff0d8' : '#f2dede',
                        color: analysisStatus.includes('thành công') ? '#3c763d' : '#a94442',
                        borderRadius: '5px'
                    }}>
                        {analysisStatus}
                    </div>
                )}
                {analysisData && (
                    <div style={{ marginTop: '20px' }}>
                        <h2>Kết quả phân tích:</h2>
                        <pre style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', overflowX: 'auto' }}>
                            {JSON.stringify(analysisData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventAnalysis;
