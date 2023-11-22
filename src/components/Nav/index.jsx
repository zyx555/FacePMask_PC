import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PieChartOutlined, IdcardOutlined, HomeOutlined,SmileOutlined} from '@ant-design/icons';
import { Menu } from 'antd';

function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;


  const items = [
    {
      key: 'prime',
      icon: <PieChartOutlined />,
      label: <Link to="/home/prime">用户管理中心</Link>,
    },
    {
      key: "work",
      icon: <IdcardOutlined />,
      label: <Link to="/home/work">上班打卡</Link>,
    }, {
      key: 'door',
      icon: <HomeOutlined />,
      label: <Link to="/home/door">智能门锁</Link>,
    }, {
      key: 'face',
      icon: <SmileOutlined />,
      label: <Link to="/home/face">人脸支付</Link>,
    },
  ];

  const generateKeys = () => {
    return currentPath.split('/')[2]
  };

  const [now, setNow] = useState();

  const menuClick = (event) => {
    setNow(event.key);
  }

  return (
    <div>
      <Menu
        mode="inline"
        style={{
          height: '100%',
          borderRight: 0,
        }}
        items={items}
        defaultSelectedKeys={generateKeys()}
        onClick={menuClick}
        selectable={true}
        selectedKeys={[generateKeys()]}
      >
      </Menu>
    </div>
  );
}

export default Nav;