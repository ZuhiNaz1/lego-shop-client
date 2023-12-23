

const ToyModal = ({toy,handleSubmit,handleClose,handleChange,toyId}) => {

    const {_id,price,quantity,description} = toy;
   
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="modal-container bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="modal-header bg-gray-200 flex py-4 px-6">
            <h2 className="text-lg font-bold">Update Toy</h2>
            <button
              className="close ml-auto text-gray-600"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body py-6 px-6">
            <form onSubmit={handleSubmit}>
              
              <div className="mb-4 flex flex-col">
                <label htmlFor="price" className="text-gray-700 font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={price}
                  onChange={handleChange}
                  className="form-input mt-2"
                />
              </div>
              <div className="mb-4  flex flex-col">
                <label
                  htmlFor="availableQuantity"
                  className="text-gray-700 font-medium"
                >
                  Available Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  defaultValue={quantity}
                  onChange={handleChange}
                  className="form-input mt-2"
                />
              </div>
              <div className="mb-4  flex flex-col">
                <label htmlFor="name" className="text-gray-700 font-medium">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={description}
                  onChange={handleChange}
                  className="form-input mt-2"
                />
              </div>
              <input type="hidden" id="toy_id" name="toy_id" value={_id} ref={toyId} />
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 mt-4"
              >
                Update Toy
              </button>
            </form>
          </div>
        </div>
      </div>

    );
};

export default ToyModal;