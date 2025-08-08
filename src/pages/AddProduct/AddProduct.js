import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({ name: '', type: '', amount: '' });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const productTypes = ['kg', 'gram', 'litre', 'box'];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = 'Product name is required';
    if (!product.type) newErrors.type = 'Product type is required';
    if (!product.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(product.amount) || product.amount <= 0)
      newErrors.amount = 'Amount must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setProducts([...products, product]);
    setProduct({ name: '', type: '', amount: '' });
    setErrors({});
    setShowModal(false); // Close modal
  };

  return (
    <div className="container add-product-page py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h4 className="text-primary">Product List</h4>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">Product Unit</label>
                    <select
                      className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                      id="type"
                      name="type"
                      value={product.type}
                      onChange={handleChange}
                    >
                      <option value="">-- Select Unit --</option>
                      {productTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                      type="number"
                      className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                      id="amount"
                      name="amount"
                      value={product.amount}
                      onChange={handleChange}
                    />
                    {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Add Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      {products.length > 0 ? (
        <div className="row mt-4">
          {products.map((prod, idx) => (
            <div className="col-md-6 col-lg-4 mb-4" key={idx}>
              <div className="card product-card shadow-sm border-0">
                <div className="card-body">
                  <h6 className="card-title text-primary">{prod.name}</h6>
                  <p className="card-text mb-1"><strong>Unit:</strong> {prod.type}</p>
                  <p className="card-text"><strong>Amount:</strong> {prod.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted mt-4">No products added yet.</div>
      )}
    </div>
  );
};

export default AddProduct;
