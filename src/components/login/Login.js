import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading'
import './Login.scss'

function Login() {
  const navigate = useNavigate()
  const notify = (string) => toast(string) // Hàm hiển thị thông báo
  const [loading, setLoading] = useState(false) // Trạng thái loading
  const onFinish = (values) => {
    // Thực hiện kiểm tra đăng nhập tại đây
    setLoading(true)
    const data = { email: values.email, password: values.password }
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }

    axios
      .post(
        'http://localhost:9000/api/v1/auth/login',
        data,
        { headers: headers },
        { withCredentials: true }
      )
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          localStorage.setItem('accessToken', response.data.result.accessToken)
          localStorage.setItem(
            'refreshToken',
            response.data.result.refreshToken
          )
          localStorage.setItem('login', true)
          axios
            .get('http://localhost:9000/api/v1/users/profile', {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
              },
            })
            .then(async (response) => {
              if (response.data.statusCode === 200) {
                localStorage.setItem(
                  'user',
                  JSON.stringify(response.data.result)
                )

                setTimeout(() => {
                  navigate('/')
                }, 2000)
              } else {
                message.error(response.data.message)
              }
            })
            .catch((error) => {
              message.error(error.response.data.message)
            })
        } else {
          message.error(response.data.message)
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi xảy ra
        if (error.response) {
          // Lỗi từ phía máy chủ
          const status = error.response.status
          if (status === 503) {
            // Xử lý lỗi 503 Service Unavailable
            message.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.')
          } else if (status === 404) {
            message.error('Không tìm thấy tài khoản này')
          } else {
            message.error(error.response.data.message)
          }
        } else if (error.request) {
          // Lỗi không có phản hồi từ máy chủ
          message.error('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.')
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          message.error('Lỗi khi thiết lập yêu cầu.')
        }
      })
      .finally(() => {
        setLoading(false)
      })

    // TEST
    // localStorage.setItem('accessToken', 'response.data.result.accessToken')
    // localStorage.setItem('refreshToken', 'response.data.result.refreshToken')
    // localStorage.setItem('login', true)
    // navigate('/')
  }

  const onFinishFailed = (errorInfo) => {
    notify('Đăng nhập thất bại')
  }

  return (
    <div className="login-page">
      {loading ? ( // Nếu đang loading thì hiển thị component loading
        <Loading></Loading>
      ) : null}
      <div className="body-login">
        <div className="login-container">
          <div
            style={{ overflow: 'hidden', width: '75%' }}
            className="login-logo"
          >
            <img
              src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
              alt="logo"
              className="logo"
            />
          </div>
          <div style={{}} className="login-content">
            <h2 style={{ color: '#4949c1' }}> Đăng nhập </h2>
            <br />
            <br />
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ email của bạn!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu của bạn!',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </Form.Item>
            </Form>

            <div className="login-footer">
              <Link
                to="/forgot-password"
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                Quên mật khẩu ?
              </Link>
              <br />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login
