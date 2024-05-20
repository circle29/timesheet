"use client";

import { useEffect, useState } from "react";

const Setting = () => {
  const [users, setUsers] = useState("");
  const [storedName, setStoredName] = useState("");
  const [storedRate, setStoredRate] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("username");
    const rate = sessionStorage.getItem("rate");
    setStoredName(name);
    setStoredRate(rate);
  }, []);

  const onSubmit = () => {};
  const cancelOnSubmit = () => {
    setUsers("");
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            id="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder={storedName}
            onChange={(e) => setUsers(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-black text-sm font-bold mb-2" id="Rate">
            Rate
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="Rate"
            placeholder={
              storedRate !== null ? `Rp. ${storedRate}` : " not available"
            }
            disabled
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-1500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={cancelOnSubmit}
          >
            Cancel
          </button>
          <button
            className="bg-red-1500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
