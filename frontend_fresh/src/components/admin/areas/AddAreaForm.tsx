import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { AreaDto } from "../../../data/DTOs/AreaDto";
import AreaService from "../../../services/AreaService";

const AddQAreaForm: React.FC = () => {
  const { token } = useAuth();

  // State variables for new area and message handling
  const [newArea, setNewArea] = useState<AreaDto>({
    category: "",
    name: "",
    fgp: "",
    relief: "",
    climate: "",
    internalWaters: "",
    soils: "",
    landscape: "",
    vegetation: "",
    fauna: "",
  });
  const { message, showMessage } = useMessageHandler();

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArea((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handler for adding a new area
  const handleAddArea = async () => {
    if (token) {
      try {
        await AreaService.addArea(newArea, token);
        setNewArea({
          category: "",
          name: "",
          fgp: "",
          relief: "",
          climate: "",
          internalWaters: "",
          soils: "",
          landscape: "",
          vegetation: "",
          fauna: "",
        });
        showMessage("success", "Area added successfully!");
      } catch (error: any) {
        console.error("Error adding area:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Add New Area</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fgp" className="block font-medium mb-2">
            FGP
          </label>
          <input
            type="text"
            id="fgp"
            name="fgp"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.fgp}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="relief" className="block font-medium mb-2">
            Relief
          </label>
          <input
            type="text"
            id="relief"
            name="relief"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.relief}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="climate" className="block font-medium mb-2">
            Climate
          </label>
          <input
            type="text"
            id="climate"
            name="climate"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.climate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="internalWaters" className="block font-medium mb-2">
            Internal Waters
          </label>
          <input
            type="text"
            id="internalWaters"
            name="internalWaters"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.internalWaters}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="soils" className="block font-medium mb-2">
            Soils
          </label>
          <input
            type="text"
            id="soils"
            name="soils"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.soils}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="landscape" className="block font-medium mb-2">
            Ladnscape
          </label>
          <input
            type="text"
            id="landscape"
            name="landscape"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.landscape}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vegetation" className="block font-medium mb-2">
            Vegetation
          </label>
          <input
            type="text"
            id="vegetation"
            name="vegetation"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.vegetation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fauna" className="block font-medium mb-2">
            Fauna
          </label>
          <input
            type="text"
            id="fauna"
            name="fauna"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newArea.fauna}
            onChange={handleChange}
          />
        </div>

      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddArea}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Area
        </button>
      </div>
      <div className="mt-3">
        {message &&
          (message.type === "error" ? (
            <ErrorMessage message={message.text} />
          ) : (
            <SuccessMessage message={message.text} />
          ))}
      </div>
    </div>
  );
};

export default AddQAreaForm;
