import { Button, Card, Col, Descriptions, Image, message, Modal, Row, Space, Tag } from 'antd';
import md5 from 'crypto-js/md5';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dữ liệu mẫu với hash code từ ID
    const room = {
        id: id || md5('default-room').toString(),
        roomNumber: "2C号室",
        type: "1K",
        address: "福岡県福岡市博多区諸岡3丁目29-12",
        building: "レオパレス諸岡2",
        shortPrice: "4,500円/日",
        midPrice: "75,000円/月",
        status: "公開中",
        image: "https://afamilycdn.com/150157425591193600/2021/1/26/01-16116291542701404412585.jpg",
    };

    const handleEdit = () => {
        navigate(`/rooms/edit/${room.id}`);
    };

    const handleDelete = () => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa phòng này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => message.success('Phòng đã bị xóa.'),
        });
    };

    return (
        <Card title={`部屋詳細 - ${room.roomNumber}`} style={{ width: '100%', margin: '20px auto' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Image src={room.image} alt="Room" style={{ width: '100%', objectFit: 'cover' }} />
                </Col>
                <Col xs={24} md={12}>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="ID">{room.id}</Descriptions.Item>
                        <Descriptions.Item label="部屋番号">{room.roomNumber}</Descriptions.Item>
                        <Descriptions.Item label="タイプ">{room.type}</Descriptions.Item>
                        <Descriptions.Item label="住所">{room.address}</Descriptions.Item>
                        <Descriptions.Item label="建物名">{room.building}</Descriptions.Item>
                        <Descriptions.Item label="基本料金">
                            <div>ショート: {room.shortPrice}</div>
                            <div>ミドル: {room.midPrice}</div>
                        </Descriptions.Item>
                        <Descriptions.Item label="状況">
                            <Tag color={room.status === "公開中" ? "green" : "red"}>{room.status}</Tag>
                        </Descriptions.Item>
                    </Descriptions>

                    {/* Nút Chỉnh sửa và Xóa */}
                    <Space style={{ marginTop: 16 }}>
                        <Button type="primary" onClick={handleEdit}>Chỉnh sửa</Button>
                        <Button type="default" danger onClick={handleDelete}>Xóa</Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomDetail;
