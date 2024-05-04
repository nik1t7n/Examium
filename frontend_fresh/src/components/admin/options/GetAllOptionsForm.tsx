import React, { useState, useEffect } from "react";
import OptionService from "../../../services/OptionService";
import { Option } from "../../../data/Models/Option";
import OptionCard from "../../info/OptionCard";

const GetAllOptionsForm: React.FC = () => {
  // State variables to hold the fetched options and loading state
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Effect hook to fetch options when the component mounts
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await OptionService.getAllOptions();
        // Update the options state with the fetched options
        setOptions(fetchedOptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">All Options</h2>
      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          options.map((option) => (
            <div key={option.id} className="mb-4">
              <OptionCard option={option} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllOptionsForm;
