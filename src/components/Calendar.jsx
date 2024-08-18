import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation} from 'react-router-dom'
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [daysInMonth, setDaysInMonth] = useState([])
  const [startDay, setStartDay] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)

  const [fullDate, setFullDate] = useState(null)
  const [viwEvent, setViewEvent] = useState(false)
  const [event, setEvent] = useState(null)
  const [getEvent, setGetEvent] = useState(null)

  const location = useLocation()

  useEffect(()=> {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = new Date(year, month , 1)
    const days = []
  
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    setDaysInMonth(days)
  
    setStartDay(new Date(year, month, 1).getDay())    
  }, [currentDate])

  const preMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }
  const nxtMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const handleDateClick = (date) => {
    setSelectedDate(date)
  }
  // Show event
  const handleEventClick = () => {
    setViewEvent(viwEvent)
  }
  // Add Event 
  const handleAddEvent = (e) => {
    setFullDate(e.toDateString())
    if (location.pathname === '/deleteevent') {
      const event = localStorage.getItem(e.toDateString())
      setGetEvent(event)
    }
  }
  const postEvent = async()=> {
    localStorage.setItem(fullDate, event)
    await axios.post("https://event.free.beeceptor.com",event)
    alert('Event Saved Successfully! Please Check Local Storage')
  }
  // View Event 
  return (
    <div className='w-full min-h-screen flex-col gap-y-9 bg-black text-white flex items-center justify-center select-none'>
         
      <div className='bg-white text-black flex justify-evenly px-5 py-2 rounded-xl w-80 font-semibold'>
        <NavLink to={'/addevent'}>Add Event</NavLink>
        <NavLink to={'/deleteevent'}>Delete Event</NavLink>
        </div>
      <div className='bg-slate-800 rounded-xl w-80 overflow-hidden'>
        <div className='flex items-center justify-between font-bold bg-blue-600 py-2 px-3'>
          <button onClick={preMonth} className='p-3'>&lt;</button>
          <span>{currentDate.toLocaleString('default',{month:'long'})} {currentDate.getFullYear()}</span>
          <button onClick={nxtMonth} className='p-3'>&gt;</button>
        </div>
        <div className='flex flex-wrap bg-neutral-50 bg-opacity-[60%] font-bold text-black mb-2 px-2'>
          {dayName.map((day, index) => (
            <div key={index} className='w-[14.28%] p-[10px] border-[2px] border-solid border-transparent text-center text-[12px] opacity-70 rounded-md'>{day}</div>
          ))}
        </div>
        <div className='flex flex-wrap px-2 pb-3'>
          {
            Array.from({length: startDay}).map((_, index)=> (
              <div key={index} className='w-[14.28%] p-[10px] border-[2px] border-solid border-transparent text-center text-[12px] opacity-70 rounded-md'></div>              
            ))
          }
          {
            daysInMonth.map((day)=> (
              <div key={day} className={`flex flex-col justify-center w-[14.28%] p-[10px] border-[2px] border-solid border-transparent text-center text-[12px] opacity-70 rounded-md cursor-pointer transition-[background-color_0.3s] hover:bg-[#e0e0e0] hover:text-black
              ${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? 'bg-[#b670f4] text-white rounded-md text-center' : ''} ${selectedDate && day.toDateString() === selectedDate.toDateString() ? 'bg-[#b670f4] text-white rounded-md text-center ' : ''}
              `} onClick={()=> {handleDateClick(day); handleAddEvent(day)}}>
                {day.getDate()}
                <span className={`text-[10px] ${viwEvent ? 'block' : 'hidden'}`}>event</span>
              </div>
            ))    
          }
        </div>
      </div>
        <div className={`w-80 h-fit bg-white bg-opacity-[50%] rounded-xl flex flex-col gap-5 items-center justify-center px-2 py-5 ${location.pathname === '/addevent' ? 'flex': 'hidden'}`}>
        <input type="text" onChange={(e)=> {setEvent(e.target.value)}} placeholder='Type event here ...' className='bg-slate-500 px-3 py-4 rounded-lg w-full placeholder:text-white outline-none'/>
        <button className='bg-blue-600 px-5 py-1 rounded-lg' onClick={()=> postEvent()}>ADD</button>
      </div>
      <div className={`w-80 h-fit bg-white bg-opacity-[50%] rounded-xl flex flex-col gap-5 items-center justify-center px-2 py-5 ${location.pathname === '/deleteevent' ? 'flex': 'hidden'}`}>        
        <small className='font-bold'>Click On The Date You Want To Delete Event</small>
        <span className='bg-black w-full px-5 py-2 bg-opacity-[50%]'>{getEvent? getEvent: "No Event" }</span>           
        <button className='bg-red-600 px-5 py-1 rounded-lg' onClick={()=> { getEvent && localStorage.removeItem(fullDate); setGetEvent('') }}>DELETE</button>            
      </div>

    </div>
  )
}

export default Calendar
