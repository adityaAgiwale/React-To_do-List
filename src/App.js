import { useEffect, useState } from "react";
import Alert from "./alert";
import List from "./list";
import "./styles.css";

//
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

export default function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ visible: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      AlertMessage(true, "Enter A value", "danger");
    } else if (value && isEditing) {
      // If values is Edited
      AlertMessage(true, "Item edited", "success");
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: value };
          }
          return item;
        })
      );
      setValue("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newValueID = { id: new Date().getDate().toString(), title: value };
      setList([...list, newValueID]);
      AlertMessage(true, "Added Item", "success");
      setValue("");
    }
  };

  // Alert Message Function
  const AlertMessage = (visible = false, msg = "", type = "") => {
    setAlert({ visible, msg, type });
  };

  // Clear All Items
  const clearAllItems = () => {
    setList([]);
    AlertMessage(true, "Removed All Items", "danger");
  };

  // remove Item
  const removeItem = (id, title) => {
    AlertMessage(true, `Item ${title} Removed`, "success");
    setList(list.filter((index) => index.id !== id));
  };

  // Edited Item
  const EditItem = (id) => {
    const Item = list.find((index) => index.id === id);

    setIsEditing(true);
    setEditId(id);
    setValue(Item.title);
  };

  // Store All Data In Local Storage

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="App">
      <div className="center-section">
        {/* form */}
        {alert && <Alert {...alert} list={list} removeAlert={AlertMessage} />}
        <form onSubmit={handleSubmit} className="form">
          <h3 className="heading">To-Do List</h3>
          <input
            type="text"
            className="inputText"
            placeholder="e.g. Read NewsPaper"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="btn btn-primary m-2" type="submit">
            {isEditing ? "Edit" : "Add"}
          </button>
        </form>
        {list.length > 0 && (
          <>
            <List list={list} removeItem={removeItem} editItem={EditItem} />
            <button
              onClick={clearAllItems}
              className="btn btn-outline-danger m-5"
            >
              Clear All
            </button>
          </>
        )}
      </div>
    </section>
  );
}
