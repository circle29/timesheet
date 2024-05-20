"use client";

import TableActivities from "@/components/TableActivities";

import AddActivities from "@/components/addActivities";
import CustomModal from "@/components/customModal";
import { addNewProject } from "@/utils/addNewProject";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [storedName, setStoredName] = useState("");
  const [storedRate, setStoredRate] = useState(0);
  const [newProject, setNewProject] = useState("");
  const [isCustomModalOpen, setCustomModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const handleAddNewProject = async () => {
    try {
      const data = await addNewProject(newProject);
      setCustomModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddNewProject();
  };

  useEffect(() => {
    const name = sessionStorage.getItem("username");
    const rate = sessionStorage.getItem("rate");
    setStoredName(name);
    setStoredRate(rate);
  }, []);

  return (
    <div className="grid grid-flow-row ">
      <div className="flex flex-row bg-white">
        <div className="flex flex-col justify-between pr-10">
          <h1 className="">Employee Name</h1>
          <p>{storedName !== null ? `${storedName}` : " not available"}</p>
        </div>
        <div className=" flex flex-col justify-between pr-10">
          <h1>Rate</h1>
          <p>{storedRate !== null ? `Rp. ${storedRate}` : " not available"}</p>
        </div>
      </div>
      <div className="flex flex-row items-center my-4">
        <h1 className="bold-20">List of activities</h1>
        <div className=" flex px-5 bg-gray-100">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1 bg-red-1500 text-white rounded-lg"
          >
            Add Activities
          </button>
          <AddActivities
            openActivities={isModalOpen}
            onClose={() => setModalOpen(false)}
            openAddProjectModal={() => setCustomModalOpen(true)}
          />
          <CustomModal
            isOpen={isCustomModalOpen}
            onClose={() => setCustomModalOpen(false)}
            input={(e) => setNewProject(e.target.value)}
            onClick={onSubmit}
            title="Add Project"
            label="Project Name"
            submit="Apply"
            cancel="Close"
          />
        </div>
      </div>
      <div className="m-6">
        <TableActivities filter={filter} />
      </div>
    </div>
  );
}
