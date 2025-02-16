import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Image, Input, InputNumber, message, Row, Select, Space, Upload } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../services/roomService';

const { Option } = Select;

const RoomCreate = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = ({ file }) => {
        if (file) {
            setFile(file);
            const newImageUrl = URL.createObjectURL(file);
            setImageUrl(newImageUrl);
        }
    };

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append('roomNumber', values.roomNumber);
            formData.append('type', values.type);
            formData.append('address', values.address);
            formData.append('building', values.building);
            formData.append('shortPrice', values.shortPrice || 0);
            formData.append('midPrice', values.midPrice || 0);
            formData.append('status', values.status);
            if (file) {
                formData.append('image', file);
            }

            await createRoom(formData);

            message.success("新しい部屋が作成されました！");
            navigate('/rooms');
        } catch (error) {
            message.error("部屋の作成中にエラーが発生しました。");
        }
    };

    return (
        <Card title="新しい部屋を作成" style={{ width: '100%', margin: '20px auto' }}>
            <Row gutter={[16, 16]}>
                {/* Ảnh phòng */}
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
                        <Button icon={<UploadOutlined />} style={{ marginTop: 16 }} >画像を選択</Button>
                    </Upload>
                </Col>

                {/* Thông tin phòng */}
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

                        <Form.Item label="部屋の面積" name="area">
                            <Input min={0} style={{ width: '100%' }}/>
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
                            <Button type="primary" htmlType="submit">部屋を作成</Button>
                            <Button onClick={() => navigate(-1)}>キャンセル</Button>
                        </Space>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
};

export default RoomCreate;
