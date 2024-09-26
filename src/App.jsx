import { useState } from "react"
import cloud from './assets/Clouds.png'
import clear from './assets/Clear.png'
import rain from './assets/Rain.png'
import mist from './assets/mist.png'
import error from './assets/error.png'

function App() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState()
  const [err, setErr] = useState()


  const API_KEY = 'dfc8f496b492ca8e298f0b444d099dbc'
  // const API = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

  const handleInput = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  }
  const myFun = async () => {
    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData);

    if (search === "") {
      // alert("Enter Name...")
      setErr("Please Enter Name")

    }
    else if(jsonData.cod == "404"){
      setErr("Please Enter Valid Name!")
    }
    else{
      setErr("")
    }
    setSearch("");

  }

  return (
    <>
      <div className="flex justify-center items-center h-lvh bg-black">
        <div className="box-border border border-black rounded-md bg-white">
          <input className="border border-black p-2 m-3 rounded-md w-80 text-xl" type="text"
            onChange={handleInput} value={search} placeholder="Enter your city Name or country" />
          <button onClick={myFun} className="border border-black p-2 m-3 rounded-md text-xl">Get Weather</button>
          {
            err ? 
            <div className="text-center text-xl flex justify-center items-center flex-col">
            <p>{err}</p>
            <img className="w-80 h-80" src={error}/>
            </div>:""
          }
          <div>
            {
              (data && data.weather) ?
                <div className="text-center m-8 font-bold text-3xl flex justify-center items-center flex-col">
                  <p>{data.name}</p>
                  <img className="w-80 h-80 "
                    src={
                      data.weather[0].main === "Clouds" ? cloud :
                      data.weather[0].main === "Clear" ? clear :
                      data.weather[0].main === "Rain" ? rain :
                      data.weather[0].main === "Mist" ? mist :
                      data.weather[0].main === "Haze" ? cloud : ""
                    }
                    alt={data.weather[0].main}
                  />

                  <p>{Math.floor(data.main.temp)}°C</p>
                  <p>{data.weather[0].description}</p>
                </div> : ""
            }
          </div>
        </div>

      </div>

    </>
  )
}

export default App;