import React from 'react';

type Props = {
  category: string;
  name: string;
  fgp: string;
  relief: string;
  climate: string;
  internalWaters: string;
  soils: string;
  landscape: string;
  vegetation: string;
  fauna: string;
  bg_color: string;
};

const AreaCard: React.FC<Props> = ({
  category,
  name,
  fgp,
  relief,
  climate,
  internalWaters,
  soils,
  landscape,
  vegetation,
  fauna,
  bg_color,
}: Props) => {
  return (
    <div className={`max-w-md mx-auto ${bg_color} shadow-md rounded-lg overflow-hidden mb-4`}>
      <div className="px-6 py-4 ">
        <div className="text-lg text-gray-800  font-semibold mb-2">{category}</div>
        <div className="text-xl text-gray-900  font-bold mb-2">{name}</div>
        <div className="text-gray-700 ">ФГП: {fgp}</div>
        <div className="text-gray-700 ">Рельеф: {relief}</div>
        <div className="text-gray-700 ">Климат: {climate}</div>
        <div className="text-gray-700 ">Внутренние воды: {internalWaters}</div>
        <div className="text-gray-700 ">Почвы: {soils}</div>
        <div className="text-gray-700 ">Ландшафт: {landscape}</div>
        <div className="text-gray-700 ">Растительный мир: {vegetation}</div>
        <div className="text-gray-700 ">Животный мир: {fauna}</div>
      </div>
    </div>
  );
};

export default AreaCard;
