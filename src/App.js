import React, { useState, useEffect, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [Comment, setComment] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Comment) {
      showAlert(true, "danger", "please enter value");
    } else if (Comment && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: Comment };
          }
          return item;
        })
      );
      setComment("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "comment added");
      const newItem = { id: new Date().getTime().toString(), title: Comment };

      setList([...list, newItem]);
      setComment("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "comment removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setComment(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  return (
  <>
   {/* <Navbar bg="light" expand="lg">

  
    <Nav className="mr-auto">
      <Link href="#home">Home</Link>
      <Link href="#link">Link</Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown href="#action/3.1">Action</NavDropdown>
        <NavDropdown href="#action/3.2">Another action</NavDropdown>
        <NavDropdown href="#action/3.3">Something</NavDropdown>
        <NavDropdown />
        <NavDropdown href="#action/3.4">Separated link</NavDropdown>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  
</Navbar> */}

      <section className="section-center">
        <form className="comment-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h2>Eleni's Blog</h2>
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              select topic
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Photos</Dropdown.Item>
              <Dropdown.Item href="#/action-2">News</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Read a story</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h3>Comments</h3>
          <div className="form-control">
            <input
              type="text"
              className="comment"
              placeholder="write your comment"
              value={Comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="comment-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear comments
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
