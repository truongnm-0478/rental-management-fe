import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import COLORS from "../../constants/color.js";

// Danh sách phòng mẫu
const roomsData = Array.from({ length: 50 }).map((_, index) => ({
    key: index.toString(),
    roomNumber: `部屋 ${index + 1}`,
    type: "1K",
    id: (6781 + index).toString(),
    address: "福岡県福岡市博多区諸岡3丁目29-12",
    building: "レオパレス諸岡2",
    shortPrice: Math.floor(Math.random() * (10000 - 4000) + 4000) + "円/日",
    midPrice: Math.floor(Math.random() * (120000 - 50000) + 50000) + "円/月",
    status: index % 2 === 0 ? "公開中" : "非公開",
}));

const RoomList = () => {
    const navigate = useNavigate();
    const { styles } = useStyle();
    const [rooms, setRooms] = useState(roomsData);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            fixed: "left",
            width: 80,
        },
        {
            title: "部屋番号",
            dataIndex: "roomNumber",
            key: "roomNumber",
            fixed: "left",
            width: 100,
        },
        {
            title: "メイン写真",
            dataIndex: "image",
            key: "image",
            render: () => <img src="https://afamilycdn.com/150157425591193600/2021/1/26/01-16116291542701404412585.jpg" alt="Room" style={{ width: 150 }} />,
            width: 150,
        },
        {
            title: "タイプ",
            dataIndex: "type",
            key: "type",
            width: 80,
        },
        {
            title: "住所",
            dataIndex: "address",
            key: "address",
            width: 200,
        },
        {
            title: "建物名",
            dataIndex: "building",
            key: "building",
            width: 150,
        },
        {
            title: "基本料金プラン",
            key: "price",
            render: (_, record) => (
                <>
                    <div>ショート: {record.shortPrice}</div>
                    <div>ミドル: {record.midPrice}</div>
                </>
            ),
            sorter: (a, b) => parseInt(a.midPrice.replace("円/月", ""), 10) - parseInt(b.midPrice.replace("円/月", ""), 10),
            width: 150,
        },
        {
            title: "状況",
            dataIndex: "status",
            key: "status",
            render: (status) => <Tag color={status === "公開中" ? "green" : "red"}>{status}</Tag>,
            filters: [
                { text: "公開中", value: "公開中" },
                { text: "非公開", value: "非公開" },
            ],
            onFilter: (value, record) => record.status === value,
            width: 100,
        },
        {
            title: "操作",
            key: "action",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <Button
                    icon={<EyeOutlined />}
                    type="link"
                    style={{ color: COLORS.PRIMARY }}
                    onClick={() => navigate(`/rooms/${record.id}`)}
                >
                    詳細
                </Button>
            ),
        },
    ];

    const handleCreate = () => {
        navigate('/rooms/create');
    };

    return (
        <div
            style={{
                minHeight: 495,
                display: "flex",
                gap: 10,
                flexDirection: "column",
            }}
        >
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <h4 style={{ color: COLORS.SECONDARY }}>運営している全ての部屋を登録しましょう。</h4>
                <Button onClick={handleCreate} type="primary" icon={<PlusOutlined />}>
                    部屋を追加
                </Button>
            </Space>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <h4>部屋 <strong>{rooms.length}</strong> 室</h4>
                <Input.Search
                    placeholder="絞り込み検索"
                    style={{ width: 200 }}
                    onSearch={(value) => {
                        const filtered = roomsData.filter((room) => room.roomNumber.includes(value) || room.address.includes(value));
                        setRooms(filtered);
                    }}
                />
            </Space>
            <div style={{ overflowX: "auto" }}>
                <Table
                    className={styles.customTable}
                    columns={columns}
                    dataSource={rooms}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: "max-content", y: 400 }}
                />
            </div>
        </div>
    );
};

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                ${antCls}-table-body,
                ${antCls}-table-content {
                    scrollbar-width: thin;
                    scrollbar-color: #eaeaea transparent;
                    scrollbar-gutter: stable;
                }
                }
            }
        `,
    };
});

export default RoomList;
