import { Layout, Menu } from 'antd'

const { Header } = Layout

const items = [
    { key: '1', label: 'ホーム' },
    { key: '2', label: 'サービス' },
    { key: '3', label: 'お問い合わせ' },
]

const AppHeader = () => {
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
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>
    )
}

export default AppHeader
