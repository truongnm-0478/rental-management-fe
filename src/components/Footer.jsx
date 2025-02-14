import { Layout } from 'antd'

const { Footer } = Layout

const AppFooter = () => {
    return (
        <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Copyright Ant Design ©{new Date().getFullYear()} Created by Ngo Mau Truong
            </Footer>
    )
}

export default AppFooter
