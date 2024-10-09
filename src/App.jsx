import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // State to manage the light status
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const getState = async () => {
      try {
        // Axios POST request to send the status to the server
        const response = await axios.get(
          "https://66727ca36ca902ae11b06c5a.mockapi.io/order/1"
        );
        console.log("Light status get successfully");
        //console.log(response.data.state)
        const ledStatus = response.data.state == "1" ? true : false;
        setIsOn(ledStatus);
      } catch (error) {
        console.error("Error getting light status:", error);
      }
    };
    getState();
  }, []);

  // Toggle the switch
  const handleToggle = async () => {
    try {
      // Axios POST request to send the status to the server
      await axios.put("https://66727ca36ca902ae11b06c5a.mockapi.io/order/1", {
        state: isOn ? "0" : "1",
        id: 1,
      });
      console.log("Light status updated successfully");
      //toggle button
      setIsOn((prev) => !prev);
    } catch (error) {
      console.error("Error updating light status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 class="text-3xl font-extrabold text-green-400 mb-10">
        Win Htike
        <small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">
          IOT Platform
        </small>
      </h1>

      <label className="inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isOn}
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">
          {isOn ? "Light is On" : "Light is Off"}
        </span>
      </label>
    </div>
  );
}

export default App;
