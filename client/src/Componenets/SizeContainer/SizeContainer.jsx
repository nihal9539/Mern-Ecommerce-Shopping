import React, { useState } from "react";
interface SizeData {
  Size: string;
}

const SizeContainer = ({ Size }: SizeData) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const selectButton = (buttonId: string) => {
    setSelectedButton(buttonId);
  };
  console.log(selectedButton, Size);

  return (
    <div
      onClick={() => selectButton(Size)}
      className={`${
        selectedButton === Size ? "bg-black" : "bg-green-200"
      } hover:bg-gray-200 cursor-pointer p-2 border rounded-md w-10 h-10 flex justify-center items-center`}
    >
      <h1 className="">{Size} </h1>
    </div>
  );
};

export default SizeContainer;
