import React, { useState, useEffect } from "react";
import './prime.css'
import axios from 'axios';
import { Breadcrumb, Layout, Progress, Col, Row, theme, Button, Table, message } from 'antd';
import { useNavigate } from "react-router-dom";
import EditForm from "./components/editform"; /* 修改弹框 */
const { Content } = Layout;

function Prime() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [list, setlist] = useState([]);
  /* 编辑用户 */
  const [editdata, seteditdata] = useState({}); /* 要编辑的用户数据 */
  const [carddata, setcarddata] = useState({}); /* 打卡数据 */
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
      title: '时间',
      dataIndex: 'time',
      render: (_, record) => {
        return record.time[0] + '-' + record.time[1] + '-' + record.time[2] + ' '
          + record.time[3] + ':' + record.time[4] + ':' + record.time[5]
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];
  useEffect(() => {
    showlist()
    /* 打卡率 */
    getStauts()
  }, []);
  const showlist = () => {
    fetch('https://123.249.122.174:9999/manager/getStatus').then(response => response.json())//解析为可读数据
      .then(data => {
        let list = data.data["打卡记录"].map((ele, i) => {
          ele.key = i;
          return ele;
        })
        console.log(list)
        setlist(list)
      })//执行结果是 resolve就调用then方法
      .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
  }
  /* 打卡率 */
  const getStauts = () => {
    fetch('https://123.249.122.174:9999/manager/rate').then(response => response.json())//解析为可读数据
      .then(data => {
        console.log(data)
        setcarddata(data.data)
        // let list = data.data["打卡记录"].map((ele, i) => {
        //   ele.key = i;
        //   return ele;
        // })
        // console.log(list)
        // setlist(list)
      })//执行结果是 resolve就调用then方法
      .catch(err => console.log("Oh, error", err))//执行结果是 reject就调用catch方法
  }
  //用户表格
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completinygg
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
  //

  return (
    <Layout>
      <Row>
        <Col span={8}>打卡率
          <br />
          <Progress type="circle" percent={carddata["打卡率"]} />
        </Col>
        <Col span={8}>人脸识别通过率
          <br />
          <Progress type="circle" percent={carddata["人脸通过率"]} /></Col>
        <Col span={8}>异常打卡率
          <br />
          <Progress type="circle" percent={carddata["异常打卡率"]} /></Col>
      </Row>

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
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}
                  style={{
                    width: 100,
                    position: 'absolute',
                    right: 100,
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
            {changeedit === true ? (
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
      </Layout >

    </Layout >
  );
}

export default Prime;
