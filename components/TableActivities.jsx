import { TABLE_ACTIVITIES } from "@/constant";
import { deleteTimesheet } from "@/utils/deleteTimesheet";
import { getTimesheet } from "@/utils/getTimesheetById";
import React, { useEffect, useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import EditActivity from "./editActivities";

const TableActivities = () => {
  const [timesheet, setTimesheet] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [totalDurationMinutes, setTotalDurationMinutes] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchTimesheet = async () => {
      try {
        const data = await getTimesheet();

        setTimesheet(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTimesheet();
  }, []);

  useEffect(() => {
    const calculateTotalIncome = async () => {
      try {
        const data = await getTimesheet();
        const totalIncomeResult = data.reduce((total, value) => {
          return total + value.income;
        }, 0);
        setTotalIncome(totalIncomeResult);
      } catch (error) {
        setError(error.message);
      }
    };

    calculateTotalIncome();
  }, [timesheet]);

  const handleDeleteTimesheet = async (timesheetId) => {
    try {
      await deleteTimesheet(timesheetId);

      setTimesheet((prevTimesheet) =>
        prevTimesheet.filter((value) => value.id !== timesheetId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditTimesheet = (activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  useEffect(() => {
    if (timesheet && timesheet.length > 0) {
      const totalDuration = timesheet.reduce((total, value) => {
        const parts = value.duration.split(" ");

        let hours = 0;
        let minutes = 0;

        if (parts.length === 4) {
          hours = parseInt(parts[0]);
          minutes = parseInt(parts[2]);
        }

        return total + (hours * 60 + minutes);
      }, 0);

      setTotalDurationMinutes(totalDuration);
    } else {
      setTotalDurationMinutes(0);
    }
  }, [timesheet]);

  const formatDuration = (totalDurationMinutes) => {
    const hours = Math.floor(totalDurationMinutes / 60);
    const minutes = totalDurationMinutes % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="flex flex-col shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {TABLE_ACTIVITIES.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timesheet && timesheet.length > 0 ? (
            timesheet.map((value) => (
              <tr
                key={value.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {value.activityName}
                </th>
                <td className="px-6 py-4">{value.projectName}</td>
                <td className="px-6 py-4">{value.startDate}</td>
                <td className="px-6 py-4">{value.endDate}</td>
                <td className="px-6 py-4">{value.startTime}</td>
                <td className="px-6 py-4">{value.endTime}</td>
                <td className="px-6 py-4">{value.duration}</td>
                <td className="px-6 py-4 flex">
                  <PencilSquareIcon
                    className="w-6 h-6 font-medium text-blue-1200 hover:underline mr-2 cursor-pointer hover:scale-125"
                    onClick={() => handleEditTimesheet(value.id)}
                  />
                  <TrashIcon
                    className="w-6 h-6 text-red-1500 cursor-pointer hover:scale-125"
                    onClick={() => handleDeleteTimesheet(value.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={TABLE_ACTIVITIES.length} className="px-6 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex m-3 flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="m-2">Total Duration</h1>
          <h1 className="m-2 text-blue-1200">
            {formatDuration(totalDurationMinutes)}
          </h1>
        </div>
        <div className="flex flex-row justify-between underline">
          <h1 className="m-2 bold-24">Total Income</h1>
          <h1 className="m-2 bold-24">Rp. {totalIncome}</h1>
        </div>
      </div>
      <EditActivity
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        timesheetId={selectedActivity}
      />
    </div>
  );
};

export default TableActivities;
