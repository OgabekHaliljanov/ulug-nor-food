import React, { useState, useEffect } from 'react';
import '../Admin/AdminPonel.css';

const AdminPanel = () => {
  const [newProduct, setNewProduct] = useState({ title: '', price: '', image: '' });
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);  // To track the selected product for editing

  // Fetch the products (foods) from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/foods')  // Correct route for fetching food products
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);  // Populate the product list
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddProduct = () => {
    fetch('http://localhost:8080/api/foods', {  // Correct route for adding food products
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts((prevProducts) => [...prevProducts, data.data]);
          setNotification('Product added successfully!');
          setTimeout(() => setNotification(''), 3000);  // Reset the notification after 3 seconds
        }
      })
      .catch(err => console.error(err));
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:8080/api/foods/${id}`, {  // Correct route for deleting a food product
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts(products.filter(product => product._id !== id));
          setNotification('Product deleted successfully!');
          setTimeout(() => setNotification(''), 3000);  // Reset the notification after 3 seconds
        }
      })
      .catch(err => console.error(err));
  };

  // Function to handle editing a product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);  // Set the selected product to edit
    setNewProduct({
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  // Function to handle updating a product
  const handleUpdateProduct = () => {
    if (!selectedProduct) return;

    fetch(`http://localhost:8080/api/foods/${selectedProduct._id}`, {  // PUT method to update a product
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts(products.map(product => 
            product._id === selectedProduct._id ? { ...product, ...newProduct } : product
          ));
          setNotification('Product updated successfully!');
          setSelectedProduct(null);  // Deselect the product after update
          setTimeout(() => setNotification(''), 3000);  // Reset the notification after 3 seconds
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* Add new product form */}
      <div className="admin-form">
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Edit selected product form */}
      {selectedProduct && (
        <div className="admin-form">
          <h3>Edit Product</h3>
          <input
            type="text"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}

      {/* Product list */}
      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product._id}>
            <img src={product.image} alt={product.title} />
            <div>
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
            <button className='ol' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
            <button className='plo'  onClick={() => handleEditProduct(product)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
