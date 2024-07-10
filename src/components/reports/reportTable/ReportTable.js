import React, { useEffect, useState } from 'react'
import {
  Select,
  message,
  Table,
  Space,
  Avatar,
  Button,
  Modal,
  Badge,
  Dropdown,
  Menu,
} from 'antd'
import useApi from '../../../api/Api'
import DOMPurify from 'dompurify'

const { Option } = Select

const ReportTable = () => {
  const Api = useApi()
  const [groups, setGroups] = useState([])
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [postContent, setPostContent] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  }

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      const response = await Api.get(
        'http://localhost:9000/api/v1/groups/admin/get-filtered-groups',
        {
          headers,
        }
      )
      setGroups(response.data.result)
    } catch (error) {
      console.error('Error fetching groups:', error)
      message.error('Xảy ra lỗi khi lấy thông tin nhóm/lớp')
    }
  }

  // Fetch reports based on selected group
  const fetchReports = async (groupId, page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const response = await Api.get(
        `http://localhost:9000/api/v1/reports/adminReport?page=${page}&size=${pageSize}${
          groupId ? `&groupId=${groupId}` : ''
        }`,
        { headers }
      )
      setReports(response.data.result.reports)
      setPagination({
        current: page,
        pageSize,
        total: response.data.result.totalPages,
      })
    } catch (error) {
      console.error('Error fetching reports:', error)
      message.error('Xảy ra lỗi khi lấy thông tin các báo cáo')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchGroups()
    fetchReports()
  }, [])

  const handleGroupChange = (value) => {
    setSelectedGroup(value)
    fetchReports(value, pagination.current, pagination.pageSize)
  }

  const handleTableChange = (pagination) => {
    fetchReports(selectedGroup, pagination.current, pagination.pageSize)
  }

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId)
    return group ? group.name : 'Unknown Group'
  }

  const handleViewPost = async (postId) => {
    try {
      const response = await Api.get(
        `http://localhost:9000/api/v1/posts/admin/${postId}`,
        { headers }
      )
      setPostContent(response.data.result)
      setIsModalVisible(true)
    } catch (error) {
      console.error('Error fetching post content:', error)
      message.error('Xảy ra lỗi khi lấy nội dung bài viết')
    }
  }

  const handleMarkAsProcessed = async (reportId) => {
    try {
      await Api.put(
        `http://localhost:9000/api/v1/reports/${reportId}/markAsProcessed`,
        {},
        { headers }
      )
      message.success('Xử lý báo cáo thành công')
      fetchReports(selectedGroup, pagination.current, pagination.pageSize)
    } catch (error) {
      console.error('Error marking report as processed:', error)
      message.error('Xảy ra lỗi khi khi xử lý báo cáo.')
    } finally {
      fetchReports(selectedGroup, pagination.current, pagination.pageSize)
    }
  }

  const handleRemoveUserFromGroup = async (userId, groupId, reportId) => {
    try {
      await Api.delete(
        `http://localhost:9000/api/v1/group-members/admin//delete-group-member-by-user-id`,
        { headers, data: { userId, groupId } }
      )
      message.success('Xóa thành viên khỏi nhóm thành công.')
      await handleMarkAsProcessed(reportId)
    } catch (error) {
      console.error('Error removing user from group:', error)
      message.error('Xảy ra lỗi khi xóa thành viên khỏi nhóm.')
    }
  }

  const handleIgnoreReport = async (reportId) => {
    await handleMarkAsProcessed(reportId)
  }

  const renderActionMenu = (record) => (
    <Menu>
      <Menu.Item
        key="removeUser"
        onClick={() =>
          handleRemoveUserFromGroup(record.author.id, record.groupId, record.id)
        }
      >
        Xóa người dùng khỏi nhóm
      </Menu.Item>
      <Menu.Item
        key="ignoreReport"
        onClick={() => handleIgnoreReport(record.id)}
      >
        Bỏ qua báo cáo
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="reports-content">
      <div className="filter-bar">
        <Select
          placeholder="Select Group"
          style={{ width: 200, marginBottom: '10px' }}
          onChange={handleGroupChange}
          allowClear
        >
          {groups
            ? groups.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))
            : null}
        </Select>
      </div>
      <Table
        dataSource={reports}
        columns={[
          {
            title: 'STT',
            render: (text, record, index) =>
              (pagination.current - 1) * pagination.pageSize + index + 1,
          },
          {
            title: 'Người báo cáo',
            render: (text, record) => (
              <>
                <Space>
                  <Avatar size="small" src={record?.author?.avatarUrl} />
                  {`${record?.author?.lastName} ${record?.author?.firstName}`}
                </Space>
              </>
            ),
          },
          { title: 'Nội dung báo cáo', dataIndex: 'content', key: 'content' },
          {
            title: 'Nhóm báo cáo',
            render: (text, record) => <>{getGroupName(record.groupId)}</>,
          },
          {
            title: 'Tình trạng',
            render: (text, record) => (
              console.log(record),
              (
                <Badge
                  count={record.processed ? 'Đã xử lý' : 'Chưa xử lý'}
                  color={record.processed ? 'green' : 'red'}
                />
              )
            ),
          },
          {
            title: 'Hành động',
            render: (text, record) => (
              <Space>
                <Button onClick={() => handleViewPost(record.postId)}>
                  Xem bài viết
                </Button>
                {!record.processed ? (
                  <Dropdown
                    overlay={renderActionMenu(record)}
                    trigger={['click']}
                  >
                    <Button type="primary">Phản hồi báo cáo</Button>
                  </Dropdown>
                ) : null}
              </Space>
            ),
          },
        ]}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Nội dung bài viết"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postContent) }}
        />
      </Modal>
    </div>
  )
}

export default ReportTable
