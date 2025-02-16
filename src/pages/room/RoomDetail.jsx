import { Button, Card, Col, Descriptions, Image, message, Modal, Row, Space, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRoom, getRoomById } from '../../services/roomService';

const RoomDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoomDetail();
    }, [id]);

    const fetchRoomDetail = async () => {
        try {
            setLoading(true);
            const data = await getRoomById(id);
            console.log("API Response:", data);

            if (!data) {
                message.error("部屋が見つかりませんでした。");
                return;
            }

            setRoom({
                id: data.id,
                roomNumber: data.roomNumber,
                type: data.type,
                address: data.address,
                building: data.building,
                shortPrice: data.shortPrice ? `${data.shortPrice}円/日` : "N/A",
                midPrice: data.midPrice ? `${data.midPrice}円/月` : "N/A",
                image: data.images?.length ? data.images[0] : null,
                status: data.status === "AVAILABLE" ? "公開中" : "非公開",
            });
        } catch (error) {
            message.error("部屋のデータを読み込む際にエラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/rooms/edit/${id}`);
    };

    const handleDelete = () => {
        Modal.confirm({
            title: "部屋を削除しますか？",
            content: "この部屋を本当に削除しますか？",
            okText: "削除",
            okType: "danger",
            cancelText: "キャンセル",
            onOk: async () => {
                try {
                    await deleteRoom(id);
                    message.success("部屋が削除されました。");
                    navigate('/rooms');
                } catch (error) {
                    message.error("部屋の削除中にエラーが発生しました。");
                }
            },
        });
    };      

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "auto", marginTop: "20px" }} />;
    }

    if (!room) {
        return <p style={{ textAlign: "center", marginTop: "20px" }}>部屋が見つかりませんでした。</p>;
    }

    return (
        <Card title={`部屋詳細 - ${room.roomNumber}`} style={{ width: '100%', margin: '20px auto' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    {room.image ? (
                        <Image
                            src={room.image}
                            alt="Room"
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0',
                                color: '#888',
                                fontSize: '16px'
                            }}
                        >
                            画像がありません
                        </div>
                    )}
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

                    <Space style={{ marginTop: 16 }}>
                        <Button type="primary" onClick={handleEdit}>編集</Button>
                        <Button type="default" danger onClick={handleDelete}>削除</Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomDetail;
