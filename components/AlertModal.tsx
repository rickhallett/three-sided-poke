import React from "react";

const AlertModal = ({ message, closeModal }) => {
  const [showModal, setShowModal] = React.useState(true);
  const [modalMessage, setModalMessage] = React.useState(message);
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={(event) => closeModal(event)}
      >
        <div className="relative w-auto mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 rounded-t"></div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                {modalMessage}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 rounded-b">
              <button
                className="bg-emerald-500 text-gray-400 active:bg-green-600 font-bold uppercase text-sm px-8 py-3 rounded shadow hover:shadow-lg hover:bg-gray-300 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(event) => closeModal(event)}
              >
                Nice!!!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AlertModal;
