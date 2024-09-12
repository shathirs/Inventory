import React, { Component } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you have your CSS file for this component

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      itemName: '',
      qty: '',
      date: '',
      itemCategory: 'Fish', // Default category
      currentItemId: null // ID of the item being edited
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("http://localhost:8000/api/posts")
      .then((res) => {
        console.log("API Response:", res);  // Log the full API response

        // Directly set posts from the response data
        this.setState({
          posts: res.data
        });
        console.log("Posts in state:", this.state.posts);  // Log the posts stored in the state
      })
      .catch((err) => {
        console.error("Error retrieving posts:", err);  // Log any errors in the request
      });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { itemName, qty, date, itemCategory, currentItemId } = this.state;

    if (currentItemId) {
      // Update item
      axios.put(`http://localhost:8000/api/post/update/${currentItemId}`, {
        itemName,
        qty,
        date,
        itemCategory
      })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Fish',
              currentItemId: null // Clear the edit mode
            });
          }
        })
        .catch((err) => {
          console.error("Error updating item:", err);
        });
    } else {
      // Add new item
      axios.post("http://localhost:8000/api/post/save", {
        itemName,
        qty,
        date,
        itemCategory
      })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Fish'
            });
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Vegetables'
            });
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Spices'
            });
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Fruits'
            });
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.retrievePosts(); // Refresh the posts list
            this.setState({
              itemName: '',
              qty: '',
              date: '',
              itemCategory: 'Rice and Noodles'
            });
          }
        })

        .catch((err) => {
          console.error("Error adding item:", err);
        });
    }
  };

  handleEdit = (post) => {
    this.setState({
      itemName: post.itemName,
      qty: post.qty,
      date: post.date,
      itemCategory: post.itemCategory,
      currentItemId: post._id // Set the current item ID for updating
    });
  };

  handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/post/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.retrievePosts(); // Refresh the posts list
        }
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  render() {
    return (
      <div className="inventory-manager">
        <div className="add-item">
          <h2>{this.state.currentItemId ? 'Update Item' : 'Add Item'}</h2>
          <form className="add-item-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={this.state.itemName}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="number"
              name="qty"
              placeholder="Quantity"
              value={this.state.qty}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              required
            />
            <select
              name="itemCategory"
              value={this.state.itemCategory}
              onChange={this.handleInputChange}
              required
            >
              <option value="Fish">Fish</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Spices">Spices</option>
              <option value="Fruits">Fruits</option>
              <option value="Rice and Noodles">Rice and Noodles</option>
            </select>
            <button type="submit">{this.state.currentItemId ? 'Update' : 'Add'}</button>
          </form>
        </div>

        <div className="item-list">
          <h2>Item List</h2>
          {this.state.posts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post) => (
                  <tr key={post._id}>
                    <td>{post.itemName}</td>
                    <td>{post.qty} kg</td>
                    <td>{new Date(post.date).toLocaleDateString()}</td>
                    <td>{post.itemCategory}</td>
                    <td>
                      <button className="update-btn" onClick={() => this.handleEdit(post)}>Update</button>
                      <button className="delete-btn" onClick={() => this.handleDelete(post._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    );
  }
}

