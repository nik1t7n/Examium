import React, { useState, useEffect } from "react";
import AreaService from "../../../services/AreaService";
import { Area } from "../../../data/Models/Area";
import AreaCard from "../../info/AreaCard";

const GetAllAreasForm: React.FC = () => {
    // State variables to hold the fetched areas and loading state
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all areas from the server
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const fetchedAreas = await AreaService.getAllAreas();
        setAreas(fetchedAreas);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">All Options</h2>
      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          areas.map((area) => (
            <div key={area.id} className="mb-4">
                <p>ID: {area.id}</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllAreasForm;
