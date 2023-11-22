import './login.css';
import { React } from 'react';
import { LockOutlined, UserOutlined, GitlabOutlined} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {

    // console.log('success', values);
    navigate(`/home`);
    // axios.create({
    //   baseURL: 'https://localhost:3000'
    // })

    // axios.post('https://123.249.122.174:9999/manager/login', {
    //   username: values.username,
    //   password: values.password
    // })
    //   .then(function (response) {
    //     console.log(response)
       
    //     // if (response.data.code == 20000) {
    //     //   message.success('登陆成功');
    //     //   console.log(response.data);
          
    //     //   //console.log('next!!')

    //     // } else {
    //     //   message.error(response.data.message)
    //     // }

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('登陆失败');
  };


  return (
    <Form id='loginform'
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div className='headerTop'>
        <div className='headerTopLeft'>
          人脸保护后台管理系统
        </div>
        <div className='headerTopRight'>
          退出
        </div>
      </div>
      <div className='loginPage'></div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginLeft: 580,
          marginTop: 100,
        }}
      >
        管理员登录
      </div>
      <div style={{ height: 10 }}></div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入账号！',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"/>
      </Form.Item>
      <Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 320 }}>
          登录
        </Button>
        <div
          style={{ marginLeft: 250, marginTop: 7 }}
        ><a href="">管理员注册</a></div>
      </Form.Item>
    </Form>

  );
}


export default Login;
