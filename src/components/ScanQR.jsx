import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import instance from '../utils/cus-axios';

function ScanQR() {
    const [ticketId, setTicketId] = useState('');
    const [checkinStatus, setCheckinStatus] = useState('');

    
    const handleCheckin = async () => {
        setCheckinStatus('Đang kiểm tra...');
        try {
            const response = await instance.get('/ticket/Checkin', {
                params: {
                    ticketid: ticketId,
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

    // State cho camera và quét
    const [hasCamera, setHasCamera] = useState(false);
    const [isScanningEnabled, setIsScanningEnabled] = useState(false);
    const [qrCode, setQrCode] = useState('');

    // State cho danh sách camera và camera được chọn
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState('');

    // State cho cài đặt camera
    const [facingMode, setFacingMode] = useState('environment');
    const [showCameraSettings, setShowCameraSettings] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);

    // Kiểm tra và lấy danh sách camera khi component được mount
    useEffect(() => {
        const checkCamera = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setHasCamera(videoDevices.length > 0);
                setCameras(videoDevices);
                if (videoDevices.length > 0) {
                    setSelectedCamera(videoDevices[0].deviceId);
                }
            } catch (err) {
                console.error('Lỗi khi kiểm tra camera:', err);
                setHasCamera(false);
            }
        };

        checkCamera();
    }, []);

    // Xử lý khi quét được mã QR
    const handleScan = (data) => {
        if (data) {
            setQrCode(data);
            console.log("Đã quét được mã QR:", data);
        }
    };

    // Xử lý lỗi khi quét
    const handleError = (err) => {
        console.error('Lỗi khi quét:', err);
    };

    // Đảo ngược camera (trước/sau)
    const toggleFacingMode = () => {
        setFacingMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
    };

    // Hiện/ẩn cài đặt camera
    const toggleCameraSettings = () => {
        setShowCameraSettings(!showCameraSettings);
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h1>Quét QR Code</h1>
            {hasCamera ? (
                <>
                    {/* Nút bắt đầu/dừng quét */}
                    <button
                        onClick={() => setIsScanningEnabled(!isScanningEnabled)}
                        style={{ marginBottom: '20px' }}
                    >
                        {isScanningEnabled ? 'Dừng quét' : 'Bắt đầu quét'}
                    </button>

                    {/* Nút hiện/ẩn cài đặt camera */}
                    <button
                        onClick={toggleCameraSettings}
                        style={{ marginLeft: '10px', marginBottom: '20px' }}
                    >
                        {showCameraSettings ? 'Ẩn cài đặt camera' : 'Hiện cài đặt camera'}
                    </button>

                    {/* Phần cài đặt camera */}
                    {showCameraSettings && (
                        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                            <h3>Cài đặt camera</h3>
                            {/* Chọn camera nếu có nhiều hơn 1 camera */}
                            {cameras.length > 1 && (
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Chọn camera: </label>
                                    <select
                                        value={selectedCamera}
                                        onChange={(e) => setSelectedCamera(e.target.value)}
                                    >
                                        {cameras.map((camera, index) => (
                                            <option key={camera.deviceId} value={camera.deviceId}>
                                                Camera {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            {/* Điều chỉnh zoom */}
                            <div style={{ marginBottom: '10px' }}>
                                <label>Zoom: </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                />
                                <span>{zoom}x</span>
                            </div>
                            {/* Điều chỉnh độ sáng */}
                            <div style={{ marginBottom: '10px' }}>
                                <label>Độ sáng: </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={brightness}
                                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                                />
                                <span>{brightness}%</span>
                            </div>
                            {/* Điều chỉnh độ tương phản */}
                            <div style={{ marginBottom: '10px' }}>
                                <label>Độ tương phản: </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={contrast}
                                    onChange={(e) => setContrast(parseInt(e.target.value))}
                                />
                                <span>{contrast}%</span>
                            </div>
                            {/* Nút đảo ngược camera */}
                            <button onClick={toggleFacingMode}>
                                {facingMode === 'environment' ? 'Chuyển sang camera trước' : 'Chuyển sang camera sau'}
                            </button>
                        </div>
                    )}

                    {/* Phần quét QR */}
                    {isScanningEnabled && (
                        <div style={{
                            width: '100%',
                            height: '500px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                                transform: `scale(${zoom})`,
                                transformOrigin: 'center',
                            }}>
                                <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%', height: '100%' }}
                                    constraints={{
                                        video: {
                                            facingMode: facingMode,
                                            deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {/* Hiển thị kết quả quét */}
                    <p>{qrCode ? `Đã quét được mã: ${qrCode}` : 'Chưa quét được mã QR nào'}</p>
                </>
            ) : (
                <p>Không tìm thấy camera. Vui lòng kiểm tra thiết bị của bạn.</p>
            )}
            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                <h3>Check-in vé</h3>
                <input
                    type="text"
                    value={ticketId}
                    onChange={(event) => setTicketId(event.target.value)}
                    placeholder="Nhập ID vé"
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button onClick={handleCheckin} style={{ padding: '5px 10px' }}>Check In</button>
                {checkinStatus && (
                    <div style={{
                        marginTop: '10px',
                        padding: '10px',
                        backgroundColor: checkinStatus.includes('thành công') ? '#dff0d8' : '#f2dede',
                        color: checkinStatus.includes('thành công') ? '#3c763d' : '#a94442',
                        borderRadius: '3px'
                    }}>
                        {checkinStatus}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScanQR;