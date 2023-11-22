import './home.css'
import React from 'react';
import Nav from '../../components/Nav';
import { UserOutlined, GitlabOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Avatar, Space} from 'antd';
import { Outlet} from 'react-router-dom';

const { Sider } = Layout;

function Home() {
  const toLogin = () => {
    return window.location.href = 'login';
  }

  return (
    <Layout>
      <div className='headerTop'>
        <div className='headerTopLeft'>
          人脸保护后台管理系统
        </div>
        <div className='headerTopRight'>
          退出
        </div>
      </div>
      <Layout>
        <Sider
          width={200}
        >
          <div className='user'>
            <div className='uesrPic' onClick={toLogin}>
              <Space direction="vertical" size={16}>
                <Space wrap size={16}>
                  <Avatar size={64} icon={<UserOutlined />} />
                </Space>
              </Space>
            </div>

            <div className='usrInfo'>
              <div className='zh'>
                admin
              </div>
              <div className='zz'>
                组织：信管工作室
              </div>
            </div>
          </div>
          <Nav />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
          </Breadcrumb>
          < Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Home;
