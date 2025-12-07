import React from "react";

export default function PayTaxModal({ show, onClose, propertyData }) {
  if (!show) {
    return null;
  }
  //   const closeModal = () => {
  //     onClose();
  //     window.location.reload();
  //   };

  return (
    <div
      className="modal fade"
      id="reactModals"
      //id="exampleModalCenter1"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      //aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        {/* <div className="modal-overlay"> */}
        <div className="modal-content">
          <h2>Property Tax</h2>
          {propertyData && (
            <table
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <label>Id : </label>
                  </td>
                  <td>
                    <input
                      defaultValue={propertyData.propertyId}
                      id="pid"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Zone : </label>
                  </td>
                  <td>
                    <input
                      defaultValue={propertyData.zone}
                      id="zone"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Tax Due : </label>
                  </td>
                  <td>
                    <input
                      defaultValue={propertyData.taxDue}
                      id="taxDue"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button id="payTax" type="button" className="btn btn-primary">
              Pay Tax
            </button>
            <button
              //onClick={closeModal}
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
