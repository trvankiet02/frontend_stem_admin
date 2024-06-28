import React from 'react'
import { Space, Table, Tag } from 'antd'
import UserTableAction from './UserTableAction'
import './UserTable.scss'
const { Column, ColumnGroup } = Table

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser', '1'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: 4,
    firstName: 'Sage Shepard',
    lastName: 'Cooper Booth',
    age: 12,
    address: '8233 In, St.',
    tags: ['nice', 'developer'],
  },
  {
    key: 5,
    firstName: 'Fritz Mcmillan',
    lastName: 'Amela Peck',
    age: 28,
    address: 'P.O. Box 160, 4793 Sed Ave',
    tags: ['nice', 'developer'],
  },
  {
    key: 6,
    firstName: 'Colorado Mann',
    lastName: 'Roth Rojas',
    age: 20,
    address: '479-514 Luctus Rd.',
    tags: ['nice', 'developer'],
  },
  {
    key: 7,
    firstName: 'Macy Dillon',
    lastName: 'Astra Vasquez',
    age: 18,
    address: '195-1818 In Rd.',
    tags: ['nice', 'developer'],
  },
  {
    key: 8,
    firstName: 'Mannix Dillard',
    lastName: 'Constance Whitley',
    age: 10,
    address: 'Ap #481-2190 Id, Rd.',
    tags: ['nice', 'developer'],
  },
  {
    key: 9,
    firstName: 'Elliott Miller',
    lastName: 'Nathan Juarez',
    age: 23,
    address: '8106 Fusce St.',
    tags: ['nice', 'developer'],
  },
  {
    key: 10,
    firstName: 'Samuel Hopkins',
    lastName: 'Yvonne Woods',
    age: 19,
    address: '158-5742 Facilisis St.',
    tags: ['nice', 'developer'],
  },
  {
    key: 11,
    firstName: 'Yoshio Charles',
    lastName: 'Isabella Palmer',
    age: 28,
    address: 'Ap #601-124 Cum St.',
    tags: ['nice', 'developer'],
  },
  {
    key: 12,
    firstName: 'Zephania Dotson',
    lastName: 'Zachery Steele',
    age: 27,
    address: 'Ap #238-2467 Enim, Av.',
    tags: ['nice', 'developer'],
  },
  {
    key: 13,
    firstName: 'Kasper Randolph',
    lastName: 'Sean Thornton',
    age: 13,
    address: '493-7136 Nam Rd.',
    tags: ['nice', 'developer'],
  },
  {
    key: 14,
    firstName: 'McKenzie Leach',
    lastName: 'Gail Macdonald',
    age: 16,
    address: 'P.O. Box 235, 4252 Sit Road',
    tags: ['nice', 'developer'],
  },
  {
    key: 15,
    firstName: 'Craig Padilla',
    lastName: 'Flavia Hughes',
    age: 15,
    address: '828-4831 Lectus Street',
    tags: ['nice', 'developer'],
  },
  {
    key: 16,
    firstName: 'Dieter Shelton',
    lastName: 'Maite Andrews',
    age: 11,
    address: '494-9502 Nisi. Ave',
    tags: ['nice', 'developer'],
  },
  {
    key: 17,
    firstName: 'Amir Fowler',
    lastName: 'Barrett Tyson',
    age: 29,
    address: '5960 Mauris, Ave',
    tags: ['nice', 'developer'],
  },
  {
    key: 18,
    firstName: 'Lev Nunez',
    lastName: 'Hasad Bright',
    age: 12,
    address: 'P.O. Box 422, 5219 Velit. Street',
    tags: ['nice', 'developer'],
  },
  {
    key: 19,
    firstName: 'Wylie Oneal',
    lastName: 'Hu Leach',
    age: 12,
    address: 'P.O. Box 174, 3162 Id, Road',
    tags: ['nice', 'developer'],
  },
  {
    key: 20,
    firstName: 'Lamar Velez',
    lastName: 'Denton Chen',
    age: 12,
    address: 'Ap #954-7596 Nisi Av.',
    tags: ['nice', 'developer'],
  },
]
const NewUserTable = () => (
  <Table
    dataSource={data}
    pagination={{
      total: 20,
      showTotal: (total) => `Total ${total} items`,
      onChange: (page, pageSize) => {
        console.log('Page: ' + page)
        console.log('PageSize: ' + pageSize)
      },
    }}
  >
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.lastName}</a>
          <a>Delete</a> */}
          <UserTableAction />
        </Space>
      )}
    />
  </Table>
)
export default NewUserTable
