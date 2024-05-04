import React, { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import AreaService from "../../../services/AreaService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { AreaDto } from "../../../data/DTOs/AreaDto";

const UpdateAreaForm: React.FC = () => {
    // State variables to hold the current area ID, updated area details, list of areas, and message
  const { token } = useAuth();
  const [areaId, setAreaId] = useState<number | string>("");
  const [updatedArea, setUpdatedArea] = useState<AreaDto>({
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
  const [areas, setAreas] = useState<AreaDto[]>([]);
  const { message, showMessage } = useMessageHandler();

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const fetchedAreas = await AreaService.getAllAreas();
        // Update the areas state with the fetched areas
        setAreas(fetchedAreas);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  // Function to handle changes in area ID input field
  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Update the areaId state with the new value
    setAreaId(value);
  };

  // Function to handle changes in input fields for updated area details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the updatedArea state with the changed field
    setUpdatedArea((prevState: any) => ({ ...prevState, [name]: value }));
  };

  // Function to handle updating an area
  const handleUpdateArea = async () => {
    if (token && areaId !== "") {
      try {
        await AreaService.updateArea(Number(areaId), updatedArea, token); 
        // Reset the areaId and updatedArea states after successful update
        setAreaId(""); 
        setUpdatedArea({
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
        showMessage("success", "Area updated successfully!");
      } catch (error) {
        console.error("Error updating area:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Update Area</h2>
      <div className="form-group">
        <label htmlFor="areaId" className="block font-medium mb-2">
          Enter Area ID
        </label>
        <input
          type="text"
          id="areaId"
          name="areaId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={areaId}
          onChange={handleAreaChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Render input fields based on updatedArea state */}
        {Object.entries(updatedArea).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label htmlFor={key} className="block font-medium mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter */}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpdateArea}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Area
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

export default UpdateAreaForm;
