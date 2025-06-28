"use client";

import { useState } from "react";
import EmployeeRecords from './records/page'
import PersonalInformation from './personal/page'
import JoiningExitDates from './joining-exit/page'
import DepartmentAssignment from './department/page'

const tabs = [
  "Employee Records",
  "Personal Info",
  "Joining & Exit Dates",
  "Department Assignment",
];

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
        👥 Employees
      </h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full font-medium text-sm ${
              activeTab === index
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-red-100 text-red-700 hover:bg-red-50"
            }`}
          >
            {tab === "Employee Records" && "📋 Employee Records"}
            {tab === "Personal Info" && "👤 Personal Info"}
            {tab === "Joining & Exit Dates" && "📅 Joining & Exit Dates"}
            {tab === "Department Assignment" && "🏢 Department Assignment"}
          </button>
        ))}
      </div>
      <div className="transition-all">
        {activeTab === 0 && <EmployeeRecords />}
        {activeTab === 1 && <PersonalInformation />}
        {activeTab === 2 && <JoiningExitDates />}
        {activeTab === 3 && <DepartmentAssignment />}
      </div>
    </div>
  );
}
