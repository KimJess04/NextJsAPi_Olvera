import Image from "next/image";
import { Inter } from "next/font/google";
//iconos usados en la pagina
import { CiCirclePlus } from "react-icons/ci"; 
import { CiSearch } from "react-icons/ci";
//importamos par uso de  la API
import { useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState('')
  const [img, setImg] = useState('')

  

  const getWeatherMatches = async() => {
  const api_key = '472547b8c52e4e8a9b1202015241003'
  const api_url = 'http://api.weatherapi.com/v1/current.json?key=' + api_key + '&q=' + location

    if (location){
      try{
        const res = await fetch(api_url)
        const data = await res.json()
        if (data){
          const api_data = {
            country: data.location.counry,
            city: data.location.name,
            temp: data.current.temp_f,
            humidity: data.current.humidity,
            wind: data.current.wind_mph,
            gust: data.current.gust_mph,
            visibility: data.current.vis_miles,
            condition: data.current.condition.text,
            img: data.current.condition.icon,
          }

          setWeather(<> 
          <div className="text-center text-2xl p-2"> {api_data.city} </div>
                  <div className="flex justify-center"> 
                    <div className="flow-root"> 

                      <div className="float-left"><img src={api_data.img} width="80" height="80" alt="Condition"/></div>
                      <div className="float-left text-6xl degrees">{api_data.temp}</div>  
                    
                  </div>
                </div>

                <div className="text-center text-gray-600"> {api_data.condition} </div>
                <div className="flow-root p-2"> 
                  <div className="float-left text-gray-600"> Humidity: {api_data.humidity} %</div>
                  <div className="float-right text-gray-600"> Wind: {api_data.wind} mph </div>
                  <div className="float-left text-gray-600"> Visibility: {api_data.visibility} mi </div>
                  <div className="float-right text-gray-600"> Gust: {api_data.gust} mph </div>
                </div>
          </>)
        }
      } catch(err){
        console.log(err)
      }
    } else {
      //console.log('no location entered')
    }

  } //cierra el getWeatherMatches

  return (
      <>
        <nav className="flex items-center justify-center py-4 bg-gray-100 w-full m-0 opacity-90">
          <div className="relative">
           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiCirclePlus size={30} />
            </div>
          </div>

          

          <input className="block bg-slate-700 text-white rounded-lg opacity-70 pl-10 p-2"
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder=" Location (Ejemplo. Paris) " /> 

          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold m-2 p-2.5 rounded-lg" 
           id="search" 
           onClick={getWeatherMatches} > 
            <CiSearch size={20}/>
            <span className="sr-only">GO</span>
          </button>
          
        </nav> 

        { weather &&
          <div className="flex w-full p-20 justify-center">
            <div className="w-full max-w-xs">
              <div className="mb-4">
                <div className="bg-white shadow-lg rounded-3xl px-8 pt-6 pb-8 mb-4 opacity-80">
                  
                  {weather}

                </div>
              </div>
            </div>
          </div>
        }

        <footer className="flex items-center justify-center bg-gray-100 w-full m-30 opacity-90">
           <p>Jessica Olvera Gordillo &nbsp;&nbsp;&nbsp; weatherapi.com</p>
         
        </footer>
        
     
      </>
  )
}
