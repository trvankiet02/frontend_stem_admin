import React, { useEffect, useState } from 'react'
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  message,
  Badge,
  Select,
  Space,
  Avatar,
} from 'antd'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import {
  EditOutlined,
  UserOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
  RetweetOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

import ACCESS_TOKEN from '../../../api/Api'

const { Option } = Select

const GroupTable = () => {
  const [data, setData] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)

  const [form] = Form.useForm()
  const [createForm] = Form.useForm()
  const location = useLocation()

  const fetchData = async (params = {}) => {
    setLoading(true)
    try {
      const response = await axios.get(
        'http://localhost:9000/api/v1/groups/admin/get-all-groups',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            size: pagination.pageSize,
            page: pagination.current,
            ...params,
          },
        }
      )

      setData(response.data.result.groups)
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
      const response = await axios.get(
        'http://localhost:9000/api/v1/users/admin',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )

      setUsers(response.data.result)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get('search') || ''
    fetchData({ search })
  }, [location.search, pagination.current, pagination.pageSize])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleTableChange = (newPagination) => {
    setPagination(newPagination)
  }

  const showModal = (group) => {
    setEditingGroup(group)
    form.setFieldsValue({
      ...group,
      isPublic: group.isPublic ? 'true' : 'false', // Ensure boolean values are properly set
      isAcceptAllRequest: group.isAcceptAllRequest ? 'true' : 'false', // Ensure boolean values are properly set
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields()
      const transformedValues = {
        ...values,
        isPublic: values.isPublic === 'true',
        isAcceptAllRequest: values.isAcceptAllRequest === 'true',
      }
      await axios.put(
        `http://localhost:9000/api/v1/groups/admin/update-group`,
        {
          groupId: editingGroup.id,
          ...transformedValues,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      message.success('Cập nhật nhóm thành công!')
      setIsModalVisible(false)
      form.resetFields()
      fetchData()
    } catch (error) {
      console.error('Error updating group:', error)
      message.error('Cập nhật nhóm thất bại!')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/v1/groups/admin/delete-group/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      message.success('Xóa nhóm thành công!')
      fetchData()
    } catch (error) {
      console.error('Error deleting group:', error)
      message.error('Xóa nhóm thất bị!')
    }
  }

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields()
      const transformedValues = {
        ...values,
        authorId: values.owner,
        isPublic: values.isPublic === 'true',
        isAcceptAllRequest: values.isAcceptAllRequest === 'true',
      }
      await axios.post(
        `http://localhost:9000/api/v1/groups/admin/create-group`,
        transformedValues,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      message.success('Tạo nhóm thành công!')
      setIsCreateModalVisible(false)
      createForm.resetFields()
      fetchData()
      console.log(transformedValues)
    } catch (error) {
      console.error('Error creating group:', error)
      message.error('Tạo nhóm thất bị!')
    }
  }

  return (
    <>
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => setIsCreateModalVisible(true)}
      >
        Tạo nhóm mới
      </Button>
      <Table
        columns={[
          {
            title: 'STT',
            render: (text, record, index) =>
              (pagination.current - 1) * pagination.pageSize + index + 1,
          },
          { title: 'Tên nhóm', dataIndex: 'name', key: 'name' },
          { title: 'Mô tả', dataIndex: 'description', key: 'description' },
          {
            title: 'Chủ sở hữu',
            render: (text, record) =>
              `${record?.author.lastName} ${record?.author.firstName}`,
          },
          {
            title: 'Thuộc tính',
            key: 'properties',
            render: (text, record) => (
              <>
                <Badge
                  count={record.isPublic ? 'Công khai' : 'Không công khai'}
                  showZero
                  color={record.isPublic ? 'green' : 'red'}
                />
                <Badge
                  count={
                    record.isAcceptAllRequest
                      ? 'Tham gia tự do'
                      : 'Cần xác thực'
                  }
                  color={record.isPublic ? 'blue' : 'orange'}
                />
              </>
            ),
          },
          {
            title: 'Hành động',
            key: 'actions',
            render: (text, record) => (
              <>
                <Space size="small">
                  <Button
                    type="primary"
                    onClick={() => showModal(record)}
                    icon={<EditOutlined />}
                  />
                  <Button
                    type="primary"
                    onClick={() => handleDelete(record.id)}
                    icon={<DeleteOutlined />}
                  />
                </Space>
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
      <Modal
        title="Cập nhật nhóm"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên nhóm"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm' }]}
          >
            <Input placeholder="Tên nhóm" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
          <Form.Item name="isPublic" label="Công khai">
            <Select placeholder="Chọn trạng thái công khai">
              <Option value="true">Công khai</Option>
              <Option value="false">Không công khai</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isAcceptAllRequest" label="Tham gia tự do">
            <Select placeholder="Chọn trạng thái tham gia">
              <Option value="true">Tham gia tự do</Option>
              <Option value="false">Cần xác thực</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Tạo nhóm mới"
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCreateModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="create" type="primary" onClick={handleCreate}>
            Tạo
          </Button>,
        ]}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="name"
            label="Tên nhóm"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhóm' }]}
          >
            <Input placeholder="Tên nhóm" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="Mô tả" />
          </Form.Item>
          <Form.Item name="isPublic" label="Công khai">
            <Select placeholder="Chọn trạng thái công khai">
              <Option value="true">Công khai</Option>
              <Option value="false">Không công khai</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isAcceptAllRequest" label="Tham gia tự do">
            <Select placeholder="Chọn trạng thái tham gia">
              <Option value="true">Tham gia tự do</Option>
              <Option value="false">Cần xác thực</Option>
            </Select>
          </Form.Item>
          <Form.Item name="owner" label="Chủ sở hữu">
            <Select
              showSearch
              placeholder="Chọn chủ sở hữu"
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
        </Form>
      </Modal>
    </>
  )
}

export default GroupTable
