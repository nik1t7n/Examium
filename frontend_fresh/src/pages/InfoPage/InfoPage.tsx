import React, { useEffect, useState } from "react";
import AreaCard from "../../components/info/AreaCard";
import AreaService from "../../services/AreaService";
import { Area } from "../../data/Models/Area"; // Импортируем тип Area

const colors = [
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
];

const InfoPage: React.FC = () => { // Указываем тип компонента

  const [areas, setAreas] = useState<Area[]>([]); // Указываем тип для состояния areas

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData: Area[] = await AreaService.getAllAreas(); // Указываем тип данных, возвращаемых из сервиса
        setAreas(areasData);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  return (
    <div className="dark:bg-gray-800">
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="h-[80vh] overflow-y-auto rounded-lg border border-gray-300 shadow-md dark:bg-gray-850">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {areas.map((area, index) => (
              <AreaCard
                key={index} // Можно использовать индекс массива, если он уникален
                category={area.category} // Добавляем типизацию для category и других свойств
                name={area.name}
                fgp={area.fgp}
                relief={area.relief}
                climate={area.climate}
                internalWaters={area.internalWaters}
                soils={area.soils}
                landscape={area.landscape}
                vegetation={area.vegetation}
                fauna={area.fauna}
                bg_color={colors[index % colors.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
