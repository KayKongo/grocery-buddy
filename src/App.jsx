import { useState } from "react";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import Items from "./components/Items";
import { ToastContainer, toast } from "react-toastify";

// Set up local storage to cause data to persist after reloading the page
const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

// Get items from local storage (Long method)
const getLocalStorage = () => {
  let list = localStorage.getItem("list");

  // In the case where the local storage is cleared, check to see if list exists before parsing to avoid parsing a null value
  if (list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = []; // set list to an empty array when it does not exist
  }
  return list;
};

// A cool one-liner implementation of geLocalStorage
const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

const App = () => {
  // Set useState to the getLocalStorage function
  const [items, setItems] = useState(defaultList);

  // Function to add items to the list from the form
  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };

    const newItemsAdded = [...items, newItem];
    setItems(newItemsAdded);

    // Update list in the local storage with new value added
    setLocalStorage(newItemsAdded);

    // Alert user on successful item addition with react-toastify
    toast.success(`"${itemName}" added successfully`);
  };

  // Function to remove items from the list
  const removeItem = (itemId, itemName) => {
    const newItems = items.filter((item) => item.id != itemId);
    setItems(newItems);

    // Update the local storage with the new list after a value is removed
    setLocalStorage(newItems);

    // Alert user on successful item removal with react-toastify
    toast.success(`"${itemName}" removed successfully`);
  };

  // Function to edit completed state of items
  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id == itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });

    setItems(newItems);
    setLocalStorage(newItems);
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};

export default App;
