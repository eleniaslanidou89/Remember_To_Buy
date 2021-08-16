import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}
function App() {
  const [Item, setComment] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!Item) {
      showAlert(true, 'danger', 'please enter value')
    } else if (Item && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: Item }
          }
          return item
        }),
      )
      setComment('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added')
      const newItem = { id: new Date().getTime().toString(), title: Item }
      setList([...list, newItem])
      setComment('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setComment(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const options = ['one', 'two', 'three']
  const defaultOption = options[0]

  return (
    <>
      <section className="section-center">
        <form className="item-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h2>Remember To Buy</h2>
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Don't forget
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Baby products!</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h3>List</h3>
          <div className="form-control">
            <input
              type="text"
              className="Item"
              placeholder="e.g milk"
              value={Item}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="Item-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default App
