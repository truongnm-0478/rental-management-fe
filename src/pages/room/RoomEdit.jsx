import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Input, InputNumber, message, Row, Select, Space, Spin, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../../services/roomService';

const { Option } = Select;

const RoomEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            setLoading(true);
            try {
                const roomData = await getRoomById(id);
                form.setFieldsValue(roomData);
                setImageUrl(roomData.images?.length ? roomData.images[0] : null);
            } catch (error) {
                message.error("部屋のデータを読み込めません。");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRoomData();
    }, [id]);

    const handleImageChange = ({ file }) => {
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
            message.success('画像が更新されました！');
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const updatedRoom = { ...values };
            if (imageFile) {
                updatedRoom.image = imageFile;
            }

            await updateRoom(id, updatedRoom);
            message.success('更新に成功しました！');
            navigate(`/rooms/${id}`);
        } catch (error) {
            message.error('部屋の更新中にエラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
    }

    return (
        <Card title="部屋を編集" style={{ width: '100%', margin: '20px auto' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    {imageUrl ? (
                        <Image src={imageUrl} alt="Room Image" style={{ width: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>画像がありません</span>
                        </div>
                    )}
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            handleImageChange({ file });
                            return false;
                        }}
                        style={{ marginTop: 16 }}
                    >
                        <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>画像を選択</Button>
                    </Upload>
                </Col>

                <Col xs={24} md={12}>
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item label="部屋番号" name="roomNumber" rules={[{ required: true, message: '部屋番号を入力してください' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="タイプ" name="type" rules={[{ required: true, message: 'タイプを入力してください' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="住所" name="address" rules={[{ required: true, message: '住所を入力してください' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="建物名" name="building" rules={[{ required: true, message: '建物名を入力してください' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="ショート料金 (円/日)" name="shortPrice">
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="ミドル料金 (円/月)" name="midPrice">
                            <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item label="状況" name="status">
                            <Select>
                                <Option value="AVAILABLE">公開中</Option>
                                <Option value="RENTED">非公開</Option>
                            </Select>
                        </Form.Item>

                        <Space style={{ marginTop: 16 }}>
                            <Button type="primary" htmlType="submit">変更を保存</Button>
                            <Button onClick={() => navigate(-1)}>キャンセル</Button>
                        </Space>

                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomEdit;
