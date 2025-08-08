import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import './BillPreview.css';

const BillPreview = forwardRef(({ billItems, total }, ref) => {
  const modalRef = useRef();

  // Expose openModal function to parent via ref
  useImperativeHandle(ref, () => ({
    openModal: () => {
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
    }
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Invoice',
        text: 'Please find the invoice below.',
        url: window.location.href,
      });
    } else {
      alert('Share is not supported in this browser');
    }
  };

  return (
    <div
      className="modal fade"
      id="invoiceModal"
      tabIndex="-1"
      ref={modalRef}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow rounded-4">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Invoice Preview</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                </tr>
              </thead>
              <tbody>
                    {billItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.amount.toFixed(2)}</td>
                        <td>₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="table-secondary">
                      <td colSpan="4" className="text-end fw-bold">
                        Grand Total
                      </td>
                      <td className="fw-bold">₹{total.toFixed(2)}</td>
                    </tr>
                  </tbody>
             
            </table>
          </div>
          <div className="modal-footer">
            <button onClick={handleShare} className="btn btn-outline-primary">
              Share
            </button>
            <button onClick={handlePrint} className="btn btn-success">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BillPreview;
