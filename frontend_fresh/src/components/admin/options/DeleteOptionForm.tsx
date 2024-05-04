import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "../../../auth/AuthContext";
import OptionService from "../../../services/OptionService";
import { Option } from "../../../data/Models/Option";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";

const DeleteOptionForm: React.FC = () => {
  // State variables to hold the fetched options, selected option ID, and message
  const { token } = useAuth();
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const { message, showMessage } = useMessageHandler();

  // Effect hook to fetch options when the component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await OptionService.getAllOptions();
        // Update the options state with the fetched options
        setOptions(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
  }, []);

  // Function to handle changes in the selected option
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Parse the selected option ID from the event target's value
    const optionId = parseInt(e.target.value, 10);
    // Update the selectedOptionId state with the parsed option ID
    setSelectedOptionId(isNaN(optionId) ? null : optionId);
  };

  // Function to handle the deletion of the selected option
  const handleDeleteOption = async () => {
    // Check if a token is available and a valid option ID is selected
    if (token && selectedOptionId !== null) {
      try {
        await OptionService.deleteOption(selectedOptionId, token);
        // Reset the selectedOptionId state after successful deletion
        setSelectedOptionId(null);
        showMessage("success", "Option deleted successfully!");
      } catch (error: any) {
        console.error("Error deleting option:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Delete Option</h2>
      <div className="form-group">
        <label htmlFor="optionId" className="block font-medium mb-2">
          Select Option to Delete
        </label>
        <select
          id="optionId"
          name="optionId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={selectedOptionId || ""}
          onChange={handleChange}
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id.toString()}>
              (ID: {option.id}) {option.text}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDeleteOption}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedOptionId}
        >
          Delete Option
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

export default DeleteOptionForm;
