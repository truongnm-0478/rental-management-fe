import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from '../components/Footer';
import AppHeader from '../components/Header';

const { Content } = Layout

const App = () => {
    return (
        <Layout>
            <AppHeader />
            <Content
                style={{
                    padding: 24,
                    minHeight: 380,
                    marginTop: 60,
                    minHeight: "calc(100vh)"
                }}
            >
                    <Outlet />
            </Content>
            <AppFooter />
        </Layout>
    );
};
export default App;
