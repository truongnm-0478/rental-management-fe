import { theme } from 'antd'

const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <div style={{ 
            textAlign: "center", 
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 495,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
        }}>
            <h2>私たちのシステムへようこそ！</h2>
        </div>
    )
}

export default Home
