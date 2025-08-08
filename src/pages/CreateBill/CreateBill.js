import React, { useState, useRef, useEffect } from 'react';
import './CreateBill.css';
import BillPreview from '../../components/BillPreview/BillPreview';

const productData = [
  { name: 'Milk', amount: 30 },
  { name: 'Sugar', amount: 40 },
  { name: 'Oil', amount: 120 },
  { name: 'Bread', amount: 25 },
];

const CreateBill = () => {
  const billPreviewRef = useRef();
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredProducts]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    const filtered = productData.filter((p) => p.name.toLowerCase().includes(val.toLowerCase()));
    setFilteredProducts(filtered);
    setSelectedProduct(null);
    setAmount('');
  };

  const handleSelectProduct = (product) => {
    setQuery(product.name);
    setAmount(product.amount);
    setQuantity(1);
    setSelectedProduct(product);
    setFilteredProducts([]);
  };

  const handleAddToBill = () => {
    if (!selectedProduct || !amount || quantity < 1) return;
    const existingIndex = billItems.findIndex((item) => item.name === selectedProduct.name);
    if (existingIndex !== -1) {
      const updatedItems = [...billItems];
      updatedItems[existingIndex].quantity += parseInt(quantity);
      updatedItems[existingIndex].total =
        updatedItems[existingIndex].quantity * updatedItems[existingIndex].amount;
      setBillItems(updatedItems);
    } else {
      const item = {
        name: selectedProduct.name,
        amount: parseFloat(amount),
        quantity: parseInt(quantity),
        total: parseFloat(amount) * parseInt(quantity),
      };
      setBillItems([...billItems, item]);
    }
    setQuery('');
    setAmount('');
    setQuantity(1);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (index, newQty) => {
    const updatedItems = [...billItems];
    updatedItems[index].quantity = parseInt(newQty);
    updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].amount;
    setBillItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...billItems];
    updatedItems.splice(index, 1);
    setBillItems(updatedItems);
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0);

  const handleCreateInvoice = () => {
    if (billItems.length === 0) {
      alert('Add at least one product.');
      return;
    }
    billPreviewRef.current?.openModal();
  };

  const handleKeyDown = (e) => {
    if (filteredProducts.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev + 1) % filteredProducts.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelectProduct(filteredProducts[highlightedIndex]);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center text-primary">Create Bill</h3>
      <div className="row ">
        <div className="col-md-4 col-lg-4 position-relative">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {filteredProducts.length > 0 && (
            <ul className="list-group position-absolute w-100 suggestion-list z-3">
              {filteredProducts.map((product, i) => (
                <li
                  key={i}
                  className={`list-group-item list-group-item-action${i === highlightedIndex ? ' active' : ''
                    }`}
                  onClick={() => handleSelectProduct(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-3 col-lg-3">
          <label className="form-label">Unit Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={!selectedProduct}
          />
        </div>

        <div className="col-md-2 col-lg-2">
          <label className="form-label">Qty</label>
          <input
            type="number"
            className="form-control w-100"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={!selectedProduct}
          />
        </div>

        <div className="col-md-3 col-lg-3 d-grid">
          <label className="form-label invisible">Add</label>
          <button className="btn btn-success" onClick={handleAddToBill}>
            Add
          </button>
        </div>
      </div>

      <h5 className="text-secondary  mt-5">Bill Items</h5>
      <div className="card p-4 shadow-sm">


        {billItems.length > 0 && (
          <div className="mt-4">
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(i, e.target.value)}
                        />
                      </td>
                      <td>₹{item.amount.toFixed(2)}</td>
                      <td>₹{item.total.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(i)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="table-secondary">
                    <td colSpan="4" className="text-end fw-bold">
                      Total
                    </td>
                    <td colSpan="2" className="fw-bold">₹{totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="text-end">
              <button className="btn btn-primary mt-4" onClick={handleCreateInvoice}>
                Create Invoice
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bill Preview Modal */}
      <BillPreview ref={billPreviewRef} billItems={billItems} total={totalAmount} />
    </div>
  );
};

export default CreateBill;