import React, { useEffect, useState } from 'react'
import {
  Table,
  Modal,
  Form,
  Button,
  message,
  Select,
  Avatar,
  Space,
  Badge,
} from 'antd'
import {
  ManOutlined,
  WomanOutlined,
  InfoCircleOutlined,
  RetweetOutlined,
  UserAddOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import useApi from '../../../../api/Api'
import './AreaTable.scss'
const { Option } = Select

const AreaTable = ({ classDetail }) => {
  const Api = useApi()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  })

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false)
  const [form] = Form.useForm()

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }

  const fetchData = async (params = {}) => {
    setLoading(true)
    try {
      const response = await Api.get(
        `http://localhost:9000/api/v1/group-members/admin/get-group-members?groupId=${classDetail.id}`,
        {
          headers,
          params: {
            size: pagination.pageSize,
            page: pagination.current,
            ...params,
          },
        }
      )

      setData(response.data.result.groupMembers)
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: response.data.result.totalPages * prevPagination.pageSize,
      }))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const fetchUsers = async () => {
    try {
      const response = await Api.get(
        'http://localhost:9000/api/v1/users/admin',
        { headers }
      )
      setUsers(response.data.result)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pagination.current, pagination.pageSize])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  }

  const showAddMemberModal = () => {
    setIsAddMemberModalVisible(true)
  }

  const showDeleteModal = (user) => {
    setEditingUser(user)
    setIsDeleteModalVisible(true)
  }

  const handleCancel = () => {
    setIsDeleteModalVisible(false)
    setIsAddMemberModalVisible(false)
    form.resetFields()
  }

  const handleDelete = async () => {
    try {
      await Api.delete(
        `http://localhost:9000/api/v1/group-members/admin/delete-group-member/${editingUser.id}`,
        { headers }
      )
      message.success('Xóa thành viên thành công!')
      setIsDeleteModalVisible(false)
      fetchData()
    } catch (error) {
      console.error('Error deleting member:', error)
      message.error('Xóa thành viên thất bại!')
    }
  }

  const handleAddMember = async () => {
    try {
      const values = await form.validateFields()
      await Api.post(
        `http://localhost:9000/api/v1/group-members/admin/add-group-member`,
        {
          groupId: classDetail.id,
          userId: values.userId,
          roleCode: values.role,
        },
        { headers }
      )
      message.success('Thêm thành viên thành công!')
      setIsAddMemberModalVisible(false)
      form.resetFields()
      fetchData()
    } catch (error) {
      console.error('Error adding member:', error)
      message.error(
        `Thêm thành viên thất bại! Vì ${error?.response?.data?.message}`
      )
    }
  }

  return (
    <>
      <section className="content-area-table">
        <h4 className="data-table-title">Quản lý thành viên lớp</h4>
        <Button
          icon={<UserAddOutlined />}
          onClick={showAddMemberModal}
          style={{ marginBottom: 12 }}
        >
          Thêm thành viên
        </Button>
        <Table
          columns={[
            {
              title: 'STT',
              render: (text, record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
            },
            {
              title: 'Họ',
              render: (record) => record?.user?.lastName,
            },
            { title: 'Tên', render: (record) => record?.user?.firstName },
            {
              title: 'Giới tính',
              render: (record) =>
                record?.user.gender === 'MALE' ? (
                  <ManOutlined style={{ color: 'blue' }} />
                ) : (
                  <WomanOutlined style={{ color: 'pink' }} />
                ),
            },
            {
              title: 'Vai trò',
              key: 'role',
              render: (text, record) => (
                <Badge
                  count={
                    record.role === 'GROUP_OWNER'
                      ? 'Quản trị viên'
                      : 'Thành viên'
                  }
                  showZero
                  color={record.role === 'GROUP_OWNER' ? 'green' : 'blue'}
                />
              ),
            },
            {
              title: 'Hành động',
              key: 'action',
              render: (text, record) => (
                <>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => showDeleteModal(record)}
                  >
                    Xóa thành viên
                  </Button>
                </>
              ),
            },
          ]}
          rowKey={(record) => record.id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </section>
      <Modal
        title="Xóa thành viên"
        visible={isDeleteModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete}>
            Xóa
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa thành viên này không?</p>
      </Modal>
      <Modal
        title="Thêm thành viên mới"
        visible={isAddMemberModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="add" type="primary" onClick={handleAddMember}>
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="userId"
            label="Thành viên"
            rules={[{ required: true, message: 'Vui lòng chọn thành viên' }]}
          >
            <Select
              showSearch
              placeholder="Chọn thành viên"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  <Space>
                    <Avatar size="small" src={user.avatarUrl} />
                    {`${user.lastName} ${user.firstName}`}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="GROUP_MEMBER">Thành viên</Option>
              <Option value="GROUP_OWNER">Quản trị viên</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AreaTable
