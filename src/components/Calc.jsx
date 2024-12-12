import React, { useState } from "react";
import { getCondition,bmiConditions } from "./Condition";

function Calc() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [data, setdata] = useState(null);
  const[bmii,setBmi]=useState(null);
  const[activeBtn,setActiveBtn]=useState(null);
  const[hunit,setHUnit]=useState('unit');
  const[wunit,setWUnit]=useState('unit');
  const[hcondition,setHCondition]=useState("");


  const handleClick=(Id)=>{
    setActiveBtn(Id);
    if(Id===1){
      setHUnit("feet,inches");
      setWUnit("pound");
    }else if(Id===2){
      setHUnit("cm");
      setWUnit("kg");
    }else if(Id===3){
      setHUnit("cm");
      setWUnit("kg");
    }
  }

  function checkForm() {
    if (!age || !weight || !height || !gender) {
      setdata("All fields are mandatory!!");
    } else {
      setdata(null);
      bmiCalculator();
    }
  }

  const bmiCalculator = () => {
    let bmi = 0;
    if (activeBtn === 2) {
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else if (activeBtn === 1) {
      const[feet,inches]=height.split(".").map(Number);
      const totalInches=feet*12+(inches||0);
      const heightInMeters = totalInches*0.0254;
      const weightInKg = weight * 0.454;
      bmi = weightInKg / (heightInMeters * heightInMeters);
    }
    const conditionSatisfied=getCondition(bmi);
    setBmi(`Your BMI is : ${bmi.toFixed(2)} kg/m^2`);
    setHCondition(conditionSatisfied);
  };

  const clearForm=()=>{
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setdata(null);
    setBmi(null);
    setActiveBtn(null);
    setHCondition(null);
  }

  const getColor=(hcondition)=>{
    switch(hcondition){
      case "Severe Thinness":
        return "#daa520";
      case "Moderate Thinness":
        return "#ffd700";
      case "Mild Thinness":
        return "#ffff00";
      case "Normal":
        return "#00ff00";
      case "Over Weight":
        return "#ffa500";
      case "Obese Class I":
        return "#ff4500";
      case "Obese Class II":
        return "#ff0000";
      case "Obese Class III":
        return "#8b0000";
      default:
        return "white";
      
    }

  }

  const getBackgroundColor=(condition)=>{
    if(hcondition===condition)
      return "blue";
    switch(condition){
      case "Severe Thinness":
        return "#daa520";
      case "Moderate Thinness":
        return "#ffd700";
      case "Mild Thinness":
        return "#ffff00";
      case "Normal":
        return "#00ff00";
      case "Over Weight":
        return "#ffa500";
      case "Obese Class I":
        return "#ff4500";
      case "Obese Class II":
        return "#ff0000";
      case "Obese Class III":
        return "#8b0000";
      default:
        return "white";
      
    }
  }

  return (
    <div className="main">

      <div className="bmical" style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="name">BMI CALCULATOR</h1>
        <p className="alert">{data}</p>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20vh",
            fontSize: "1.5vw",
          }}
        >
          <div className="unit">
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "row" }}>
              <button className="units"   onClick={() => handleClick(1)}
                style={{
                  backgroundColor: activeBtn === 1 ? "blue" : "gray",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}>US unit</button>
              <button className="units"  onClick={() => handleClick(2)}
                style={{
                  backgroundColor: activeBtn === 2 ? "blue" : "gray",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}>Metric</button>
              <button className="units"   onClick={() => handleClick(3)}
                style={{
                  backgroundColor: activeBtn === 3 ? "blue" : "gray",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                }}>Other</button>
            </ul>
          </div>
          <div className="form">
            <ul style={{ listStyle: "none" }}>
              <li>
                <label htmlFor="age">
                  Age
                  <input
                    type="number"
                    placeholder="Enter your age"
                    id="age"
                    value={age}
                    onChange={(e) =>{ const value=e.target.value;
                      if(/^\d{0,2}$/.test(value)){
                        setAge(value);
                      }
                    }}
                  />
                </label>
              </li>
              <li>
                Gender
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female">Female</label>
              </li>
              <li>
                  Height
                  <input
                    type="text"
                    value={height}
                    placeholder="" 
                    id="height"
                    onChange={(e) =>{ const value=e.target.value;
                      if(/^\d*\.?\d*$/.test(value)){
                        setHeight(value);
                      }
                    }}
                  />
                <label className="placeholder">{hunit}</label>
              </li>
              <li>
                  Weight
                  <input
                    type="number"
                    value={weight}
                    placeholder=" "
                    id="weight"
                    onChange={(e) =>{ const value=e.target.value;
                      if(/^\d{0,4}$/.test(value)){
                        setWeight (value);
                      }
                    }}
                  />
                <label className="placeholder">{wunit}</label>
              </li>
            </ul>
          </div>
          <div className="end-btn">
            <button className="endbtn calculate" onClick={checkForm}>
              Calculate
            </button>
            <button className="endbtn clear" onClick={clearForm}>
              Clear
            </button>
          </div>
        </div>
      </div>


    {bmii &&(<div className="result">
      <h2>RESULT</h2>
      <p className="bmi">{bmii}</p>
      <p className="condition" style={{color:getColor(hcondition)}}>{hcondition}</p>
    </div>
    )}

<div className="info">
          <h3 className="bmirange">BMI Range : </h3>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Ranges</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {bmiConditions.map((row,index)=>(
                  <tr
                    key={index}
                    style={{
                      backgroundColor:getBackgroundColor(row.condition),color:"white",
                      fontSize:hcondition===row.condition?"1.2em":"1em",
                      transitions:"all 0.3s ease",
                    }}>
                      <td>{row.range}</td>
                      <td>{row.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

    </div>
  );
}

export default Calc;
