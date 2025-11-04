// src/components/DatePickerField.jsx
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Calendar } from "lucide-react";

const DatePickerField = ({ label, value, onChange, name }) => {
  const handleValueChange = (newValue) => {
    onChange({ target: { name, value: newValue.startDate } });
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-gray-700 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <Datepicker
          useRange={false}
          asSingle={true}
          value={{
            startDate: value || null,
            endDate: value || null,
          }}
          onChange={handleValueChange}
          displayFormat={"YYYY-MM-DD"}
          inputClassName="w-full border border-gray-300 rounded-lg py-2.5 pl-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <Calendar
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default DatePickerField;
