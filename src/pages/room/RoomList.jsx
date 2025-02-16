import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin, Table, Tag } from "antd";
import { createStyles } from "antd-style";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import COLORS from "../../constants/color.js";
import { getAllRooms } from "../../services/roomService.js";

const RoomList = () => {
    const navigate = useNavigate();
    const { styles } = useStyle();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchRooms(0);
    }, []);

    const fetchRooms = async (page = 0) => {
        setLoading(true);
        const data = await getAllRooms(page, 6);

        const formattedData = data.content.map((room) => ({
            ...room,
            key: room.id.toString(),
            shortPrice: room.shortPrice ? `${room.shortPrice}円/日` : "N/A",
            midPrice: room.midPrice ? `${room.midPrice}円/月` : "N/A",
            image: room.images?.length ? room.images[0] : null,
            status: room.status === "AVAILABLE" ? "公開中" : "非公開",
        }));
 
        setRooms(formattedData);
        setCurrentPage(data.number + 1);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

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
            render: (image) =>
                image ? (
                    <img
                        src={image}
                        alt="Room"
                        style={{ width: 150, height: 100, objectFit: "cover", borderRadius: 5 }}
                    />
                ) : (
                    <Tag color="gray">画像なし</Tag>
                ),
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
            sorter: (a, b) => parseInt(a.midPrice) - parseInt(b.midPrice),
            width: 150,
        },
        {
            title: "状況",
            dataIndex: "status",
            key: "status",
            render: (status) => <Tag color={status === "公開中" ? "green" : "red"}>{status}</Tag>,
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
        navigate("/rooms/create");
    };

    const filteredRooms = rooms.filter(
        (room) =>
            room.roomNumber.includes(searchTerm) ||
            room.address.includes(searchTerm) ||
            room.building.includes(searchTerm)
    );

    if (loading) {
        return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
    }

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
                <h4 style={{ color: COLORS.SECONDARY }}>
                    運営している全ての部屋を登録しましょう。
                </h4>
                <Button onClick={handleCreate} type="primary" icon={<PlusOutlined />}>
                    部屋を追加
                </Button>
            </Space>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
                <h4>
                    部屋 <strong>{filteredRooms.length}</strong> 室
                </h4>
                <Input.Search
                    placeholder="絞り込み検索"
                    style={{ width: 200 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Space>
            <div style={{ overflowX: "auto" }}>
                <Table
                    className={styles.customTable}
                    columns={columns}
                    dataSource={filteredRooms}
                    pagination={{
                        current: currentPage,
                        total: totalPages * 10,
                        pageSize: 10,
                        onChange: (page) => fetchRooms(page - 1),
                    }}
                    scroll={{ x: "max-content"}}
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
