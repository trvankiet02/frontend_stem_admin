import React from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

const { Search } = Input

const SearchBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onSearch = (value) => {
    navigate(`?search=${value}`)
  }

  const searchParams = new URLSearchParams(location.search)
  const defaultValue = searchParams.get('search') || ''

  return (
    <Search
      placeholder="Search classes"
      defaultValue={defaultValue}
      onSearch={onSearch}
      enterButton
      style={{ margin: '8px' }}
    />
  )
}

export default SearchBar
