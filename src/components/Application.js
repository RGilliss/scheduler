import React , { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import axios from "axios";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "McLovin",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Stewie",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Cartman",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];
export default function Application() {
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days}));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // appointments: {}
  }); 

  useEffect(() => {
    const daysURL = `/api/days`;
    axios.get(daysURL).then((response) => {
     setDays(response.data)
    });
  }, [])

  const schedule = appointments.map(appointment => {
    return (
      <Appointment 
      key={appointment.id} {...appointment} 
      />
      )})
      return (
        <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
        {schedule}
        <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
