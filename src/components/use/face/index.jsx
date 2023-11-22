import './face.css';
import EditForm from "./components/editform";
import axios from 'axios';
import { Breadcrumb, Layout, Space, theme, message ,Button, Table, DatePicker} from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { RangePicker } = DatePicker;


function Face() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [list, setlist] = useState([]);
  /* 编辑用户 */
  const [editdata, seteditdata] = useState(null); /* 要编辑的用户数据 */
  const [searchtxt, setsearchtxt] = useState(''); /* 搜索你文本 */
  const [changeedit, setchangeedit] = useState(false); /* 表格选框显示隐藏 */
  const navigate = useNavigate();
  /* 修改弹窗的显示隐藏状态 */
  const changesedithadow = function (msg) {
    console.log(msg);
    setchangeedit(msg);
  };
  /* 获得修改数据 */
  const changedata = function (msg) {
    axios.put('https://123.249.122.174:9999/manager/update', {
      ...msg
    })
      .then(function (res) {
        console.log(res.data.message)
        if (res.data.code == 20000) {
          message.success(res.data.message)
          setchangeedit(false)
          showlist()
        } else {
          message.error(res.data.message)
        }

      })
      .catch(function (error) {
        message.error(error.response.data.error)
      })
  };
  
  //用户表格-开始
  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '支付时间',
      dataIndex: 'time',
      
    },
    {
      title: '人脸矩阵',
      dataIndex: 'photoAddress',
      render: (_, record) => (
        <Space size="middle">
          <a
            href="#!"
            onClick={() => {
              console.log(record);
              seteditdata(null)
              fetch(`https://123.249.122.174:9999/manager/info?username=${record.username}`)
                .then(response => response.json())//解析为可读数据
                .then(data => {
                  console.log(data)
                  seteditdata({ ...data.data.aa, type: 'view' });
                })//执行结果是 resolve就调用then方法
                .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法

              /* 编辑 */
              setchangeedit(true);
            }}
          >
            <svg style={{paddingLeft:16}} t="1683221605698" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5428" width="48" height="48"><path d="M848 64h-84c-7.2 0-14.3 2.7-19.8 8.2-5.5 5.5-8.2 12.6-8.2 19.8 0 7.2 2.7 14.3 8.2 19.8 5.5 5.5 12.6 8.2 19.8 8.2h84v84c0 7.2 2.7 14.3 8.2 19.8 5.5 5.5 12.6 8.2 19.8 8.2s14.3-2.7 19.8-8.2c5.5-5.5 8.2-12.6 8.2-19.8v-84c0-30.9-25.1-56-56-56zM876 512c-7.2 0-14.3 2.7-19.8 8.2-5.5 5.5-8.2 12.6-8.2 19.8v84h-84c-7.2 0-14.3 2.7-19.8 8.2-1.5 1.5-2.3 3.4-3.4 5.2-31.6-30.4-67.1-55.4-106.4-72C714.2 517.7 764.7 426 749.2 323c-14.6-96.7-89.6-177.5-185.3-197.5-17.6-3.7-35-5.4-51.9-5.4-132.6 0-240 107.4-240 240 0 87.6 47.5 163.5 117.6 205.4-39.2 16.6-74.8 41.6-106.4 72-1.1-1.8-1.9-3.7-3.4-5.2-5.5-5.5-12.6-8.2-19.8-8.2h-84v-84c0-7.2-2.7-14.3-8.2-19.8-5.5-5.5-12.6-8.2-19.8-8.2s-14.3 2.7-19.8 8.2c-5.5 5.5-8.2 12.6-8.2 19.8v84c0 30.9 25.1 56 56 56h69c-46.8 60.6-79.3 136.5-89.5 221.3-3.8 31.2 21.1 58.7 52.5 58.7h608c31.4 0 56.2-27.6 52.5-58.7-10.2-84.9-42.7-160.8-89.5-221.4h69c30.9 0 56-25.1 56-56v-84c0-7.2-2.7-14.3-8.2-19.8-5.5-5.5-12.6-8.2-19.8-8.2zM211.5 905c16.9-132.8 93.3-242.9 199.9-288 19.4-8.2 32.6-26.7 34.1-47.7 1.5-21.1-9-41.1-27.2-52C361.8 483.6 328 424.7 328 360c0-101.5 82.5-184 184-184 13.4 0 27 1.4 40.4 4.3 72.1 15.1 130.3 77.2 141.4 151.1 11.4 75.5-22.4 146.8-88.2 186-18.1 10.8-28.6 30.9-27.2 52 1.5 21.1 14.6 39.5 34.1 47.7C719 661.9 795.3 771.7 812.4 904l-600.9 1zM148 232c7.2 0 14.3-2.7 19.8-8.2 5.5-5.5 8.2-12.6 8.2-19.8v-84h84c7.2 0 14.3-2.7 19.8-8.2 5.5-5.5 8.2-12.6 8.2-19.8 0-7.2-2.7-14.3-8.2-19.8-5.5-5.5-12.6-8.2-19.8-8.2h-84c-30.9 0-56 25.1-56 56v84c0 7.2 2.7 14.3 8.2 19.8 5.5 5.5 12.6 8.2 19.8 8.2z" p-id="5429" fill="#707070"></path></svg>
            </a>
        </Space>
      ),
    }
  ];
  useEffect(() => {
    // document.title = `Hello, ${props.name}`;
    showlist()
  }, []);
  const showlist = () => {
    fetch('https://123.249.122.174:9999/manager/list').then(response => response.json())//解析为可读数据
      .then(data => {
        console.log(data.data["所有人员"])
        let list = data.data["所有人员"].map((ele, i) => {
          ele.key = i;
          return ele;
        })
        setlist(list)
      })//执行结果是 resolve就调用then方法
      .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
  }
  //用户表格
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  
  return (
    <Layout>
    
      <Layout>
        
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
          <Header
          style={{
            padding: 0,
            marginTop:-20,
            marginBottom:10,
            background: colorBgContainer,
          }}
          
        >
          <span style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <RangePicker />
        </Header>
        
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            
            <div>
              <div
              style={{
                marginBottom: 16,
              }}
              >
                <span>支付历史记录</span>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading} 
                  style={{
                    width:100,
                    marginRight:-10,
                    position:'absolute',
                    right:100,
                 }}
                >
                 批量删除
                </Button>
                  <span
                  style={{
                     marginLeft: 8,
                    }}
                    >
                      {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                  </span>
              </div>
              <Table rowSelection={rowSelection} columns={columns} dataSource={list} />
            </div>
            {/* 编辑弹框 */}
            {changeedit === true && editdata != null ? (
              <EditForm
                changeedit={changeedit} /* 显示隐藏弹框初始化 */
                editdata={editdata} /* 编辑的数据 */
                changesedithadow={changesedithadow} /* 显示隐藏弹窗状态变更 */
                changedata={changedata} /* 获得添加数据 */
              />
            ) : (
              ""
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Face;
