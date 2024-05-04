import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "../../../auth/AuthContext";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { Area } from "../../../data/Models/Area";
import AreaService from "../../../services/AreaService";

const DeleteAreaForm: React.FC = () => {
  // State variables for token, delete option, area ID, area options, and message handling
  const { token } = useAuth();
  const [deleteOption, setDeleteOption] = useState<string>("");
  const [areaId, setAreaId] = useState<number | string>("");
  const [areaOptions, setAreaOptions] = useState<Area[]>([]);
  const { message, showMessage } = useMessageHandler();

  // Effect to fetch area options when token changes
  useEffect(() => {
    if (token) {
      const fetchAreas = async () => {
        try {
          const data = await AreaService.getAllAreas();
          setAreaOptions(data);
        } catch (error) {
          console.error("Error fetching areas:", error);
        }
      };
      fetchAreas();
    }
  }, [token]);

  // Handler for deleting an area
  const handleDeleteArea = async () => {
    if (token) {
      try {
        await AreaService.deleteArea(Number(areaId), token);
        setAreaId("");
        showMessage("success", "Area deleted successfully!");
      } catch (error) {
        console.error("Error deleting area:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  // Handler for selecting delete option
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeleteOption(e.target.value);
    setAreaId("");
  };

  // Handler for changing area ID
  const handleAreaIdChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setAreaId(e.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Delete Area</h2>
      <div className="form-group">
        <label htmlFor="deleteOption" className="block font-medium mb-2">
          Delete Option
        </label>
        <select
          id="deleteOption"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2 mb-2"
          value={deleteOption}
          onChange={handleSelectChange}
        >
          <option value="">Select Delete Option</option>
          <option value="id">Delete by ID</option>
          <option value="existing">Choose from Existing Areas</option>
        </select>
      </div>
      {deleteOption === "id" && (
        <div className="form-group">
          <label htmlFor="questionId" className="block font-medium mb-2">
            Area ID
          </label>
          <input
            type="number"
            id="questionId"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={areaId}
            onChange={handleAreaIdChange}
          />
        </div>
      )}
      {deleteOption === "existing" && (
        <div className="form-group">
          <label htmlFor="existingQuestion" className="block font-medium mb-2">
            Select Question to Delete
          </label>
          <select
            id="existingQuestion"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={areaId}
            onChange={handleAreaIdChange}
          >
            <option value="">Select Area</option>
            {areaOptions.map((area) => (
              <option key={area.id} value={area.id}>
                (ID:{area.id}) {area.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDeleteArea}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={!areaId}
        >
          Delete Area
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

export default DeleteAreaForm;
