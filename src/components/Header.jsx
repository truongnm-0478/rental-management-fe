import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const items = [
    { key: '/', label: <Link to="/">ホーム</Link> },
    // { key: '/about', label: <Link to="/about">サービス</Link> },
    { key: '/rooms', label: <Link to="/rooms">部屋リスト</Link> },
];

const AppHeader = () => {
    const location = useLocation();

    return (
        <Header
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 999,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={items}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
        </Header>
    );
};

export default AppHeader;
