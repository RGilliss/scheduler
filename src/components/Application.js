import React , { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
// import useVisualMode from "../hooks/useVisualMode"


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days}));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((state) => {
      setState(prev => ({...prev, 
        days: state[0].data, 
        appointments: state[1].data, 
        interviewers: state[2].data}))
    })
  }, []);

 
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map(appointment => { 
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers}
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
