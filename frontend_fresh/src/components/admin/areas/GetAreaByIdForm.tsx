import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import ErrorMessage from "../../state/ErrorMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import SuccessMessage from "../../state/SuccessMessage";
import { Area } from "../../../data/Models/Area";
import AreaService from "../../../services/AreaService";
import AreaCard from "../../info/AreaCard";

const GetAreaByIdForm: React.FC = () => {
    // State variables to hold the current area ID, area details, loading state, error message, and authentication token
  const { token } = useAuth();
  const { message, showMessage } = useMessageHandler();
  const [areaId, setAreaId] = useState<number>(0);
  const [area, setArea] = useState<Area | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle fetching area details by ID
  const handleGetAreaById = async () => {
    setLoading(true);

    // Check if the user is authenticated
    if (token) {
      try {
        const result = await AreaService.getAreaById(areaId, token);
        setArea(result);
      } catch (error) {
        console.error("Error getting area by ID:", error);
        showMessage("error", `${error}`);
      } finally {
        // Set loading state to false after fetching area details
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Get Area By ID</h2>
      <div className="form-group">
        <label htmlFor="areaId" className="block font-medium mb-2">
          Area ID
        </label>
        <input
          type="number"
          id="areaId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={areaId}
          onChange={(e) => setAreaId(Number(e.target.value))}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleGetAreaById}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Area
        </button>
      </div>
      {loading && <div>Loading...</div>}

      {!loading && area && (
        <div className="mt-4">
          <AreaCard
            category={area.category}
            name={area.name}
            fgp={area.fgp}
            relief={area.relief}
            climate={area.climate}
            internalWaters={area.internalWaters}
            soils={area.soils}
            landscape={area.landscape}
            vegetation={area.vegetation}
            fauna={area.fauna}
            bg_color={"text-gray-600"}
          />
        </div>
      )}

      {!loading && (
        <div className="mt-3">
          {message &&
            (message.type === "error" ? (
              <ErrorMessage message={message.text} />
            ) : (
              <SuccessMessage message={message.text} />
            ))}
        </div>
      )}
    </div>
  );
};

export default GetAreaByIdForm;
