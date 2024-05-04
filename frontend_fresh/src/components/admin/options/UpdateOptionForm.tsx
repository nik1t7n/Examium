import React, { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import OptionService from "../../../services/OptionService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { OptionDto } from "../../../data/DTOs/OptionDto";
import { Option } from "../../../data/Models/Option";

const UpdateOptionForm: React.FC = () => {
  const { token } = useAuth();
  const [optionId, setOptionId] = useState<number>(0); // State for selected option ID
  const [updatedOption, setUpdatedOption] = useState<OptionDto>({ // State for updated option
    text: "",
    isCorrect: false,
    questionId: 0
  });
  const [options, setOptions] = useState<Option[]>([]); // state for available options
  const { message, showMessage } = useMessageHandler();

  useEffect(() => {
    // Fetch available options when component mounts
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await OptionService.getAllOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Destructure the name and value from the event target
    const { name, value } = e.target;
  
    // Declare a variable to store the new value with type annotation
    let newValue: number | boolean | string;
  
    // Check if the input is for the 'isCorrect' field
    if (name === 'isCorrect') {
      // If so, convert the value to a boolean
      newValue = value === 'true';
    }
    // Check if the input is for the 'optionId' field
    else if (name === 'optionId') {
      // If so, parse the value to an integer
      newValue = parseInt(value);
    } else {
      // For other fields, keep the value as it is
      newValue = value;
    }
  
    // Update the state based on the input name
    if (name === "optionId") {
      // If the input is for 'optionId', update the state for optionId
      setOptionId(newValue as number);
    } else if (name === "questionId") {
      // If the input is for 'questionId', update the state for questionId inside updatedOption
      setUpdatedOption(prevState => ({ ...prevState, questionId: parseInt(newValue as string) }));
    } else {
      // For other fields, update the state for updatedOption using the spread operator to maintain previous state
      setUpdatedOption(prevState => ({ ...prevState, [name]: newValue }));
    }
  };

  // Function to handle updating an option
  const handleUpdateOption = async () => {
    if (token) {
      try {
        await OptionService.updateOption(Number(optionId), updatedOption, token);
        // Reset states after update
        setOptionId(0);
        setUpdatedOption({ text: "", isCorrect: false, questionId: 0 });
        showMessage("success", "Option updated successfully!");
      } catch (error: any) {
        console.error("Error updating option:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Update Option</h2>
      <div className="form-group">
        <label htmlFor="optionId" className="block font-medium mb-2">
          Select Option
        </label>
        <select
          id="optionId"
          name="optionId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={optionId}
          onChange={handleChange}
        >
          <option value="">Select an option...</option>
          {options.map(option => (
            <option key={option.id} value={option.id.toString()}>
              (ID: {option.id}) {option.text}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="text" className="block font-medium mb-2">
          Updated Option Text
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={updatedOption.text}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="isCorrect" className="block font-medium mb-2">
          Is Correct?
        </label>
        <select
          id="isCorrect"
          name="isCorrect"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={updatedOption.isCorrect.toString()}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpdateOption}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Option
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

export default UpdateOptionForm;
