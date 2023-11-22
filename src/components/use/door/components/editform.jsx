/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Radio,
  Form,
  Input,
  DatePicker,
  Space,
  Button,
  Table,
  Spin,
  Select,
  Modal,
} from "antd";

import "./index.css";
import moment from "moment";
import locale from "antd/lib/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";
// import { areaGetAll } from "../../../../api/major";
import { map } from "lodash";
const { Option } = Select;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
export default function AddForm(props) {
  console.log(props)
  const [buttonText, setButtonText] = useState("");
  const [loadingstate, setloadingstate] = useState(true); /* 加载状态 */
  const [state, setstate] = useState(false); /* 弹框显示隐藏状态 */
  /* 编辑用户信息 */
  const [id, setid] = useState(props.editdata.id);
  const [username, setusername] = useState(props.editdata.username);
  const [password, setpassword] = useState(props.editdata.password);
  const [photoAddress, setphotoAddress] = useState(props.editdata.photoAddress);
  const [email, setemail] = useState(props.editdata.email);
  const [phone, setphone] = useState(props.editdata.phone);
  const [type, settype] = useState(props.editdata.type);
  /* 人脸矩阵 */
  const [faceList, setfaceList] = useState(props.editdata.faceList);
  const [form] = Form.useForm();
  useEffect(() => {
    setstate(props.changeedit);
    console.log(props.changeedit)

  }, []);

  return (
    <div id="Editform">
      <Modal
        className="Editform"
        footer={null}
        wrapClassName={"languageEditform"}
        centered={true}
        open={props.changeedit}
        onOk={() => {
          props.changesedithadow(false);
        }}
        onCancel={() => {
          props.changesedithadow(false);
        }}
      >
        <Form
          form={form}
          {...formItemLayout}
          onFinish={(val) => {
            console.log(val);
            let result = { ...val };
            result.id = id;
            /* 传递数据 */
            props.changedata(result);
          }}
          initialValues={{
            username: username,
            password: password,
            photoAddress: photoAddress,
            email: email,
            phone: phone,
          }}
        >
          <Row gutter={[4, 0]}>
            <Col span={24}>
              {type == 'edit' ?
                <Form.Item
                  name="username"
                  label="用户名"
                  style={{ width: 400 }}

                >

                  <Input
                    value={username}
                  ></Input>
                </Form.Item>
                : <Form.Item
                  label="用户名"
                  style={{ width: 400 }}

                >
                  {username}
                </Form.Item>

              }
              {
                type == 'view' ?
                  <Form.Item label="人脸矩阵" style={{ width: 400 }}>

                    {faceList}

                  </Form.Item>
                  : ''

              }
              

            </Col>
          </Row>

          <p className="btnline">
            <Button
              className="btn"
              onClick={() => {
                props.changesedithadow(false);
              }}
            >
              {type == 'view' ? '确定' : '取消'}
            </Button>
            &nbsp;
            &nbsp;
            {
              type == 'edit' ?
                <Button type="primary" className="btn" htmlType="submit">
                  提交
                </Button>
                : ''
            }

          </p>
        </Form>
      </Modal>
    </div >
  );
}
