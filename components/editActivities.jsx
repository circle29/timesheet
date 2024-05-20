import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today, Time } from "@internationalized/date";
import { TimeInput } from "@nextui-org/date-input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { fetchProject } from "@/utils/fetchProject";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  minDate: Yup.date().required("Please select a date"),
  maxDate: Yup.date().required("Please select a date"),
  minTime: Yup.string().required("Please input time"),
  maxTime: Yup.string().required("Please input time"),
});

const EditActivity = ({ isOpen, onClose, timesheetId }) => {
  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(0);
  const [rate, setRate] = useState(0);

  const formik = useFormik({
    initialValues: {
      minDate: "",
      maxDate: "",
      minTime: "",
      maxTime: "",
      activityName: "",
    },

    validationSchema: schema,
    onSubmit: async (values) => {
      const startDate = `${values.minDate.toString()} ${values.minTime.toString()}`;
      const endDate = `${values.maxDate.toString()} ${values.maxTime.toString()}`;

      try {
        const body = {
          timesheetId: timesheetId,
          endDate: endDate,
          selectedProject: selectedProject.id,
          startDate: startDate,
          activityName: values.activityName,
        };

        const response = await fetch("/api/timesheet", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        onClose();

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const userId = Number(sessionStorage.getItem("userId"));
    const rate = Number(sessionStorage.getItem("rate"));
    setUser(userId);
    setRate(rate);
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const project = await fetchProject();

        setProject(project);
      } catch (error) {
        console.error(error);
      }
    };

    getProjects();
  }, []);

  if (!isOpen) return null;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md mx-auto w-[800px]">
          <h2 className="text-2xl mb-4">Edit Activity</h2>

          <div className="flex flex-row justify-center items-center">
            <div className="w-full flex flex-row justify-center gap-4">
              <div className="w-full flex flex-col gap-1">
                <h3>Start date</h3>
                <DatePicker
                  aria-label="minDate"
                  minValue={today(getLocalTimeZone())}
                  maxValue={today(getLocalTimeZone())}
                  defaultValue={today(getLocalTimeZone())}
                  onChange={(date) => formik.setFieldValue("minDate", date)}
                />
                {formik.errors.minDate && formik.touched.minDate && (
                  <div className="text-red-500">{formik.errors.minDate}</div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3>End date</h3>
                <DatePicker
                  aria-label="MaxDate"
                  minValue={today(getLocalTimeZone())}
                  maxValue={today(getLocalTimeZone())}
                  defaultValue={today(getLocalTimeZone())}
                  onChange={(date) => formik.setFieldValue("maxDate", date)}
                />
                {formik.errors.maxDate && formik.touched.maxDate && (
                  <div className="text-red-500">{formik.errors.maxDate}</div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3>Start Time</h3>
                <TimeInput
                  aria-label="startTime"
                  defaultValue={new Time(8)}
                  minValue={new Time(9)}
                  onChange={(time) => formik.setFieldValue("minTime", time)}
                />
                {formik.errors.minTime && formik.touched.minTime && (
                  <div className="text-red-500">{formik.errors.minTime}</div>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3>End Time</h3>
                <TimeInput
                  aria-label="endTime"
                  defaultValue={new Time(17)}
                  maxValue={new Time(17)}
                  onChange={(time) => formik.setFieldValue("maxTime", time)}
                />
                {formik.errors.maxTime && formik.touched.maxTime && (
                  <div className="text-red-500">{formik.errors.maxTime}</div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Activity Name
            </label>
            <input
              className="mt-3 p-4 block h-7 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              onChange={formik.handleChange("activityName")}
            />
            {formik.errors.activityName && formik.touched.activityName && (
              <div className="text-red-500">{formik.errors.activityName}</div>
            )}
          </div>
          <div className="mb-4">
            <p className="block text-sm font-medium text-black">Project Name</p>
            <Dropdown required>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="w-full rounded-lg h-7 mt-3 p-4  justify- bg-red-1500 text-white"
                >
                  {selectedProject
                    ? selectedProject.projectName
                    : "Select Project"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" className="w-[720px]">
                {project.map((project) => (
                  <DropdownItem
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                  >
                    {project.projectName}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-1500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-1500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditActivity;
