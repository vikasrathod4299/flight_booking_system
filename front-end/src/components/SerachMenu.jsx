import axios from "axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";


const SerachMenu = () => {

  const navigate = useNavigate()
  const location = useLocation()
  
  const [validatFlage, setFlag] = useState(false)
  const [errMsg, setErrMsg] = useState("");
  const [borderClass, setBorderClass] = useState('border-gray-300')
  const [cities, setCities] = useState([]);
  
  const [params, setParams] = useState({
    depaDate: new Date().toJSON().split("T")[0],
    returnDate:undefined,
    adult: "1",
    child: 0,
  });

  useEffect(() => {
    (async () => {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}city`);
      setCities(data.data);
    })();
  }, []);

  const handleParams = (e) => {
    setParams((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    if(validatFlage){
      navigate(`/searchFlight?fromCity=${params.fromCity}&toCity=${params.toCity}&date=${params.depaDate}&returnDate=${params.returnDate}&for-${params.adult}a-${params.child}c`)
      window.localStorage.setItem("searchParam", JSON.stringify(params));
    }else{
      setBorderClass('border-red-500')
      setErrMsg('*Select city from dropdown!')
    }
  };



  return (
    <div className="bg-gradient-to-r sticky -top-56 from-purple-500 to-cyan-500 h-64 shadow-purple-200 shadow-xl p-4">


      <div className="pt-28 max-w-screen-xl  mx-auto px-20 lg:px-0 ">
          <div className=" bg-white flex justify-center items-center h-52 rounded-3xl shadow-xl px-12">
            <div className="flex ml-28 gap-x-4 w-[80vw] mx-auto flex-col sm:flex-row">
              <SearchInput
                cities={cities}
                ph="From"
                name={"fromCity"}
                excludeCity={params.toCity}
                setCityId={setParams}
                setFlag={setFlag}
                borderClass={borderClass}
                setBorderClass={setBorderClass}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
              />
              <SearchInput
                cities={cities}
                ph="To"
                name={"toCity"}
                excludeCity={params.fromCity}
                setCityId={setParams}
                setFlag={setFlag}
                borderClass={borderClass}
                setBorderClass={setBorderClass}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
                />  
              <div className="flex flex-col w-1/6">
                <code className="text-gray-600" htmlFor="departure">
                  Departure:
                </code>
                <input
                  className="p-3 border-2 outline-blue-500 border-gray-300 rounded-lg"
                  type={"date"}
                  id="departure"
                  name="depaDate"
                  value={params.depaDate}
                  placeholder="Departure date"
                  min={new Date().toJSON().split("T")[0]}
                  onChange={handleParams}
                  />
              </div>

              <div className="flex flex-col w-1/6">
                  <code className="text-gray-600" htmlFor="return">
                    Return: <button onClick={e=>setParams(p=>({...p,returnDate:undefined}))}><i className="fa-solid fa-circle-xmark" /></button>
                  </code>
                  <input
                    className="p-3  border-2 outline-blue-500 border-gray-300 rounded-lg"
                    type={"date"}
                    id="return"
                    name="returnDate"
                    value={params.returnDate===undefined?'':params.returnDate}
                    placeholder="Return date"
                    min={params.depaDate}
                    onChange={handleParams}
                    />
              </div>

              <div className="flex flex-col w-20 gap-x-6">
                <code className="text-gray-600" htmlFor="return">
                  Travellers:
                </code>
                <div className="flex gap-x-1 h-14">

                    <select defaultValue={1} 
                    name="adult"
                    onChange={handleParams}
                    className=" rounded-lg px-4 text-sm border-2 bg-white outline-blue-500">
                        <option value={1}>Adult</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>
                    <select defaultValue={0} 
                    name="child"
                    onChange={handleParams}
                    className="rounded-lg px-4 text-sm border-2 bg-white outline-blue-500">
                        <option value={0}>child</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="text-center -mt-5 w-full">
              <button
                className={`tracking-wide bg-gradient-to-r to-cyan-500 text-white shadow-purple-200 shadow-xl rounded-full h-10 ${location.pathname!=='/searchFlight'?'px-16':'px-8'} font-bold hover:tracking-widest`}
                onClick={handleSearch}>
                {location.pathname!=='/searchFlight'?'SEARCH':'UPDATE SEARCH'}
              </button>
          </div>
      </div>
      <Outlet/>
    </div>
  )
};

export default SerachMenu;
