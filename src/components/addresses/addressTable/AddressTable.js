import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd'
import useApi from '../../../api/Api'

const { Option } = Select

const AddressManagement = () => {
  const Api = useApi()
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [schools, setSchools] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentType, setCurrentType] = useState('')
  const [editingRecord, setEditingRecord] = useState(null)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 })
  const [districtsPagination, setDistrictsPagination] = useState({
    current: 1,
    pageSize: 5,
  })
  const [schoolsPagination, setSchoolsPagination] = useState({
    current: 1,
    pageSize: 5,
  })
  const [form] = Form.useForm()

  const fetchProvinces = async (page = 1, pageSize = 5) => {
    setLoading(true)
    try {
      const response = await Api.get(
        `/api/v1/addresses/admin/provinces?page=${page}&size=${pageSize}`
      )
      setProvinces(response.data.result.provinces)
      setPagination({
        ...pagination,
        total: response.data.result.totalElements,
        current: page,
      })
    } catch (error) {
      console.error('Error fetching provinces:', error)
      message.error('Xảy ra sự cố khi lấy thông tin các tỉnh')
    }
    setLoading(false)
  }

  const fetchDistricts = async (provinceId, page = 1, pageSize = 5) => {
    setLoading(true)
    try {
      const response = await Api.get(
        `/api/v1/addresses/admin/districtsByProvince?pId=${provinceId}&page=${page}&size=${pageSize}`
      )
      setDistricts(response.data.result.districts)
      setDistrictsPagination({
        ...districtsPagination,
        total: response.data.result.totalElements,
        current: page,
      })
    } catch (error) {
      console.error('Error fetching districts:', error)
      message.error('Xảy ra sự cố khi lấy thông tin các quận/huyện')
    }
    setLoading(false)
  }

  const fetchSchools = async (districtId, page = 1, pageSize = 5) => {
    setLoading(true)
    try {
      const response = await Api.get(
        `/api/v1/addresses/admin/schoolsByDistrict?dId=${districtId}&page=${page}&size=${pageSize}`
      )
      setSchools(response.data.result.schools)
      setSchoolsPagination({
        ...schoolsPagination,
        total: response.data.result.totalElements,
        current: page,
      })
    } catch (error) {
      console.error('Error fetching schools:', error)
      message.error('Xảy ra sự cố khi lấy thông tin các trường học')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProvinces()
  }, [])

  const handleSelectProvince = (province) => {
    setSelectedProvince(province)
    setSelectedDistrict(null)
    fetchDistricts(province.id)
  }

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district)
    fetchSchools(district.id)
  }

  const handleOpenModal = (type, record = null) => {
    setCurrentType(type)
    setEditingRecord(record)
    const formValues = { ...record }
    if (type === 'district' && record) {
      formValues.provinceId = selectedProvince?.id
    }
    if (type === 'school' && record) {
      formValues.districtId = selectedDistrict?.id
    }
    form.setFieldsValue(formValues)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = async () => {
    const values = form.getFieldsValue()
    const id = editingRecord?.id
    const type = currentType
    setLoading(true)
    try {
      if (id) {
        await Api.put(`/api/v1/addresses/admin/${type}s/${id}`, values)
        message.success(
          // `${type.charAt(0).toUpperCase() + type.slice(1)} Cập nhật thành công`
          `Cập nhật thành công`
        )
      } else {
        await Api.post(`/api/v1/addresses/admin/${type}s`, values)
        message.success(
          // `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`
          `Thêm mới thành công`
        )
      }
      if (type === 'province') fetchProvinces()
      else if (type === 'district') fetchDistricts(selectedProvince.id)
      else if (type === 'school') fetchSchools(selectedDistrict.id)
      handleCancel()
    } catch (error) {
      console.error(`Error saving ${type}:`, error)
      // message.error(`Failed to save ${type}.`)
      message.error(`Xảy ra sự cố khi lưu thông tin`)
    }
    setLoading(false)
  }

  const handleDelete = async (type, id) => {
    setLoading(true)
    try {
      await Api.delete(`/api/v1/addresses/admin/${type}s/${id}`)
      message.success(
        // `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`
        `Xóa thành công`
      )
      if (type === 'province') fetchProvinces()
      else if (type === 'district') fetchDistricts(selectedProvince.id)
      else if (type === 'school') fetchSchools(selectedDistrict.id)
    } catch (error) {
      console.error(
        `Error deleting ${type}:`,
        error
      )// message.error(`Failed to delete ${type}.`)
      `Xóa thất bại`
    }
    setLoading(false)
  }

  const handleTableChange = (type, pagination) => {
    if (type === 'province') {
      fetchProvinces(pagination.current, pagination.pageSize)
    } else if (type === 'district') {
      fetchDistricts(
        selectedProvince.id,
        pagination.current,
        pagination.pageSize
      )
    } else if (type === 'school') {
      fetchSchools(selectedDistrict.id, pagination.current, pagination.pageSize)
    }
  }

  const columns = (type) => [
    {
      title: 'STT',
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Mã số',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <>
          <Space>
            <Button onClick={() => handleOpenModal(type, record)}>Sửa</Button>
            <Button danger onClick={() => handleDelete(type, record.id)}>
              Xóa
            </Button>
          </Space>
        </>
      ),
    },
  ]

  return (
    <div className="address-management">
      <h2>Danh sách tỉnh</h2>
      <Button onClick={() => handleOpenModal('province')}>Thêm tỉnh</Button>
      <Table
        columns={columns('province')}
        dataSource={provinces}
        rowKey={(record) => record.id}
        loading={loading}
        onRow={(record) => ({
          onClick: () => handleSelectProvince(record),
        })}
        pagination={pagination}
        onChange={(pagination) => handleTableChange('province', pagination)}
      />

      {selectedProvince && (
        <>
          <h2>Danh sách quận/huyện tại {selectedProvince.name}</h2>
          <Button onClick={() => handleOpenModal('district')}>
            Thêm quận/huyện
          </Button>
          <Table
            columns={columns('district')}
            dataSource={districts}
            rowKey={(record) => record.id}
            loading={loading}
            onRow={(record) => ({
              onClick: () => handleSelectDistrict(record),
            })}
            pagination={districtsPagination}
            onChange={(pagination) => handleTableChange('district', pagination)}
          />
        </>
      )}

      {selectedDistrict && (
        <>
          <h2>Danh sách trường học tại {selectedDistrict.name}</h2>
          <Button onClick={() => handleOpenModal('school')}>
            Thêm trường học
          </Button>
          <Table
            columns={columns('school')}
            dataSource={schools}
            rowKey={(record) => record.id}
            loading={loading}
            pagination={schoolsPagination}
            onChange={(pagination) => handleTableChange('school', pagination)}
          />
        </>
      )}

      <Modal
        title={`Edit ${
          currentType.charAt(0).toUpperCase() + currentType.slice(1)
        }`}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form}>
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          {currentType === 'district' && (
            <Form.Item
              name="provinceId"
              label="Province"
              rules={[{ required: true, message: 'Please select a province' }]}
            >
              <Select>
                {provinces.map((province) => (
                  <Option key={province.id} value={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {currentType === 'school' && (
            <Form.Item
              name="districtId"
              label="District"
              rules={[{ required: true, message: 'Please select a district' }]}
            >
              <Select>
                {districts.map((district) => (
                  <Option key={district.id} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default AddressManagement
