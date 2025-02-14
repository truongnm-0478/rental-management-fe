import { Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Content, Footer } = Layout

const items = [
    { key: "1", label: "Trang chủ" },
    { key: "2", label: "Dịch vụ" },
    { key: "3", label: "Liên hệ" },
]

const MainLayout = () => {
    return (
        <Layout>
            <Header style={{ color: "white" }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} items={items} />
            </Header>

            <Content style={{ padding: "20px" }}>
                <Outlet />
            </Content>

            <Footer style={{ textAlign: "center" }}>© 2024 Ant Design</Footer>
        </Layout>
    )
}

export default MainLayout
