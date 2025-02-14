import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';

const { Content } = Layout

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()
    
    return (
        <Layout>
            <AppHeader />
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Content style={{ padding: "20px" }}>
                        <Outlet />
                    </Content>
                </div>
            </Content>
            <AppFooter />
        </Layout>
    );
};
export default App;
