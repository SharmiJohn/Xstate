import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [selectCountry, setselectCountry] = useState("");
  const [selectState, setselectState] = useState("");
  const [selectCity, setselectCity] = useState("");
  const [city, setcity] = useState([]);
  const handleCountry = (e) => {
    setselectCountry(e.target.value);
    setstate([]);
    setcity([]);
    setselectState("");
    setselectCity("");
  };
  const handleState = (e) => {
    setselectState(e.target.value);
    setcity([]);
    setselectCity("");
  };
  const handleCity = (e) => {
    setselectCity(e.target.value);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        let response = await axios.get(
          "https://crio-location-selector.onrender.com/countries"
        );
        setcountry(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      try {
        let response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/states`
        );
        setstate(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchState();
  }, [selectCountry]);

  useEffect(() => {
    const fetchcity = async () => {
      try {
        const response = await axios.get(
          `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
        );
        setcity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchcity();
  }, [selectState]);

  console.log(city);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Select Location</h1>
      <form>
        <select
          name="Country"
          id="Country"
          onChange={(e) => handleCountry(e)}
          style={{ width: "300px", margin: "20px", height: "40px" }}
        >
          <option value=" ">Select Country</option>
          {country.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          name="State"
          id="State"
          onChange={(e) => handleState(e)}
          disabled={selectCountry === ""}
          style={{ width: "200px", margin: "20px", height: "40px" }}
        >
          <option value=" ">Select State</option>
          {state.map((value1, index) => (
            <option key={index} value={value1}>
              {value1}
            </option>
          ))}
        </select>

        <select
          name="City"
          id="City"
          onChange={(e) => handleCity(e)}
          disabled={selectState === ""}
          style={{ width: "200px", margin: "20px", height: "40px" }}
        >
          <option value=" ">Select City</option>
          {city.map((value2, index) => (
            <option key={index} value={value2}>
              {value2}
            </option>
          ))}
        </select>
      </form>
      <div style={{ fontFamily: "Poppins" }}>
        {selectCountry !== "" && selectState !== "" && selectCity !== "" && (
          <h3>
            You Selected{" "}
            <span style={{ fontSize: "30px", fontFamily: "Poppins" }}>
              {selectCity}
            </span>
            , 
            <span style={{ color: "	rgb(128, 128, 128)" }}>
            {" "}{selectState},{" "}{selectCountry}
            </span>
          </h3>
        )}
      </div>
    </div>
  );
}

export default App;
