// import './App.css'

import { useEffect, useState } from "react"

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL);

      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts/2/`)
        if(!response.ok){
          throw new Error("response is not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch(error){
        console.log(error);
      }
    }

    // fetchData()
    
  }, [])

  //////////////////////////////////////

  const userData = {
    username: 'YaPidor',
    password: 'Pidaras',
    first_name: 'Hitler',
    last_name: 'Kaput',
    email: 'Svastikaonelove@gmail.com',
  };

  const acces = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU0MzM2MjQxLCJpYXQiOjE3NTQzMzU5NDEsImp0aSI6ImY5NTBkM2I0ODRlZDQ2NmE4MzYyNTc1NmVmZTEwZTUxIiwidXNlcl9pZCI6IjEifQ.OX1q62BhMxHKhTKrPsPsJZKMJOcsmDh7w4xe0IQaZiY";

  async function sendUserData() {
   try {
      const response = await fetch(`http://localhost:8000/api/posts/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${acces}`,
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Помилка ');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <>
      <div className="text-3xl">kaput</div>
      <button onClick={sendUserData}>Don't push the horses</button>
    </>
  )
}