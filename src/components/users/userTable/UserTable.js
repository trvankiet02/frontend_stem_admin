import React, { useEffect, useState } from 'react'
import { Table, Modal, Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import {
  ManOutlined,
  WomanOutlined,
  UserOutlined,
  UserAddOutlined,
  EditOutlined,
  InfoCircleOutlined,
  RetweetOutlined,
} from '@ant-design/icons'
import useApi from '../../../api/Api'

const UserTable = () => {
  const Api = useApi()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [form] = Form.useForm()
  const location = useLocation()

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }
  const fetchData = async (params = {}) => {
    setLoading(true)
    try {
      const response = await Api.get(
        'http://localhost:9000/api/v1/users/admin/get-all-users',
        {
          headers,
          params: {
            size: pagination.pageSize,
            page: pagination.current,
            ...params,
          },
        }
      )

      setData(response.data.result.users)
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: response.data.result.totalPages * prevPagination.pageSize,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search') || ''
    fetchData({ search })
  }, [location.search, pagination.current, pagination.pageSize])

  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  }

  const showModal = (user) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleResetPassword = async (userId) => {
    try {
      const response = await Api.post(
        `http://localhost:9000/api/v1/users/admin/reset-password`,
        { userId },
        {
          headers,
        }
      )
      console.log('Reset password response:', response)
      message.success('Đã tạo mật khẩu mới thành công!')
    } catch (error) {
      console.error('Error resetting password:', error)
      message.error('Đã xảy ra lỗi khi tạo mật khẩu mới!')
    }
  }

  return (
    <>
      <Table
        columns={[
          {
            title: 'STT',
            render: (text, record, index) =>
              (pagination.current - 1) * pagination.pageSize + index + 1,
          },
          { title: 'Họ', dataIndex: 'lastName', key: 'lastName' },
          { title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
          { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
          {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) =>
              gender === 'male' ? (
                <ManOutlined style={{ color: 'blue' }} />
              ) : (
                <WomanOutlined style={{ color: 'pink' }} />
              ),
          },
          {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) =>
              role === 'TEACHER'
                ? 'Giáo viên'
                : role === 'PARENT'
                ? 'Phụ huynh'
                : role === 'STUDENT'
                ? 'Học sinh'
                : 'Quản trị viên',
          },
          {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
              <>
                <Button
                  icon={<InfoCircleOutlined />}
                  onClick={() => showModal(record)}
                >
                  Xem chi tiết
                </Button>
                <Button
                  icon={<RetweetOutlined />}
                  onClick={() => handleResetPassword(record.id)}
                >
                  Tạo mật khẩu mới
                </Button>
              </>
            ),
          },
        ]}
        rowKey={(record, index) => record.id + index}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Thông tin tài khoản liên kết"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        <Form form={form} layout="vertical">
          {editingUser?.parents ? (
            <Form.Item
              name="parents"
              label="Danh sách phụ huynh được liên kết"
              rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            >
              <Table
                columns={[
                  {
                    title: 'STT',
                    render: (text, record, index) =>
                      (pagination.current - 1) * pagination.pageSize +
                      index +
                      1,
                  },
                  { title: 'Họ', dataIndex: 'lastName', key: 'lastName' },
                  { title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
                  { title: 'Email', dataIndex: 'email', key: 'email' },
                  { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
                  { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
                  {
                    title: 'Giới tính',
                    dataIndex: 'gender',
                    key: 'gender',
                    render: (gender) =>
                      gender === 'male' ? (
                        <ManOutlined style={{ color: 'blue' }} />
                      ) : (
                        <WomanOutlined style={{ color: 'pink' }} />
                      ),
                  },
                  {
                    title: 'Vai trò',
                    dataIndex: 'role',
                    key: 'role',
                  },
                  {
                    title: 'Hành động',
                    key: 'action',
                    render: (text, record) => (
                      <>
                        <Button
                          icon={<InfoCircleOutlined />}
                          onClick={() => showModal(record)}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          icon={<RetweetOutlined />}
                          onClick={() => handleResetPassword(record.id)}
                        >
                          Tạo mật khẩu mới
                        </Button>
                      </>
                    ),
                  },
                ]}
                rowKey={(record) => record.id}
                dataSource={editingUser.parents}
              />
            </Form.Item>
          ) : (
            <p>Không có danh sách phụ huynh liên kết</p>
          )}
          {editingUser?.children ? (
            <Form.Item
              name="children"
              label="Danh sách học sinh được liên kết"
              rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
            >
              <Table
                columns={[
                  {
                    title: 'STT',
                    render: (text, record, index) =>
                      (pagination.current - 1) * pagination.pageSize +
                      index +
                      1,
                  },
                  { title: 'Họ', dataIndex: 'lastName', key: 'lastName' },
                  { title: 'Tên', dataIndex: 'firstName', key: 'firstName' },
                  { title: 'Email', dataIndex: 'email', key: 'email' },
                  { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
                  { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
                  {
                    title: 'Giới tính',
                    dataIndex: 'gender',
                    key: 'gender',
                    render: (gender) =>
                      gender === 'male' ? (
                        <ManOutlined style={{ color: 'blue' }} />
                      ) : (
                        <WomanOutlined style={{ color: 'pink' }} />
                      ),
                  },
                  {
                    title: 'Vai trò',
                    dataIndex: 'role',
                    key: 'role',
                  },
                  {
                    title: 'Hành động',
                    key: 'action',
                    render: (text, record) => (
                      <>
                        <Button
                          icon={<InfoCircleOutlined />}
                          onClick={() => showModal(record)}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          icon={<RetweetOutlined />}
                          onClick={() => handleResetPassword(record.id)}
                        >
                          Tạo mật khẩu mới
                        </Button>
                      </>
                    ),
                  },
                ]}
                rowKey={(record) => record.id}
                dataSource={editingUser.children}
              />
            </Form.Item>
          ) : (
            <p>Không có danh sách học sinh được liên kết</p>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default UserTable
