import React , { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import axios from "axios";
import getAppointmentsForDay from "../helpers/selectors"


export default function Application() {
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days}));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  }); 
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map(appointment => { 
    return (
      <Appointment 
      key={appointment.id} time={appointment.time} interview={appointment.interview}
      />
    )}
  );

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
          {schedule}
          <Appointment time={"5pm"} />
        </section>
      </main>
  );
}
