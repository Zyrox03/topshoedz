// Modal.jsx

import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export const Modal = ({ isOpen, onClose, modalTitle, children }) => {
  const modalClass = isOpen ? "" : "hidden ";

  const modalRef = useRef(null);

  useEffect(() => {
    const element = modalRef.current;

    if (element) {
      if (isOpen) {
        // Add classes and delay for scale-100
        element.classList.add("scale-0");
        element.classList.remove("scale-100");

        setTimeout(() => {
          element.classList.remove("scale-0");

          element.classList.add("scale-100");
        }, 5);
      }
    }
  }, [isOpen]);
  return (
    <div
      style={{ zIndex: 1001 }}
      className={`fixed inset-0  ${modalClass} flex items-center justify-center  `}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div
        ref={modalRef}
        style={{ zIndex: 100 }}
        className={` overflow-y-scroll max-h-[90vh] bg-slate-100 p-4 md:p-8 rounded-lg shadow-lg w-[90%] md:w-1/2  my-12 transition-transform`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{modalTitle}</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div id="modalContent">{children}</div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
