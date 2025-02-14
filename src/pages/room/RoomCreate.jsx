import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Input, InputNumber, message, Row, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const RoomCreate = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);

    // Xử lý khi chọn ảnh
    const handleImageChange = ({ file }) => {
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
        }
    };

    // Xử lý khi nhấn "Tạo phòng"
    const onFinish = (values) => {
        console.log('Thông tin phòng mới:', { ...values, image: imageUrl });
        message.success('Phòng mới đã được tạo!');
        navigate('/rooms'); // Chuyển về danh sách phòng
    };

    return (
        <Card title="Tạo phòng mới" style={{ width: '100%', margin: '20px auto' }}>
            <Row gutter={[16, 16]}>
                {/* Ảnh phòng */}
                <Col xs={24} md={12}>
                    {imageUrl ? (
                        <Image src={imageUrl} alt="Room Image" style={{ width: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: 200, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span>Chưa có ảnh</span>
                        </div>
                    )}
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                            handleImageChange({ file });
                            return false; // Ngăn chặn upload lên server
                        }}
                        style={{ marginTop: 16 }}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Col>

                {/* Thông tin phòng */}
                <Col xs={24} md={12}>
                    <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item label="部屋番号" name="roomNumber" rules={[{ required: true, message: 'Vui lòng nhập số phòng' }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item label="タイプ" name="type">
                            <Input />
                        </Form.Item>

                        <Form.Item label="住所" name="address">
                            <Input />
                        </Form.Item>

                        <Form.Item label="建物名" name="building">
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
                                <Option value="公開中">公開中</Option>
                                <Option value="非公開">非公開</Option>
                            </Select>
                        </Form.Item>

                        <Space style={{ marginTop: 16 }}>
                            <Button type="primary" htmlType="submit">Tạo phòng</Button>
                            <Button onClick={() => navigate(-1)}>Hủy</Button>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomCreate;
