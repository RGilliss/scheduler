import React , { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
// import useVisualMode from "../hooks/useVisualMode"


export default function Application() {
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days}));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }); 
  console.log("APPLICATION STATE:", state);
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
      .catch(err => err.message)
    }, []);
    
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersForDay(state, state.day);
    
  function bookInterview(id, interview) {
    console.log("bookInterview",id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => setState({...state, appointments}))
    .catch(err => console.log(err.message));
    
  }
  
  const schedule = appointments.map(appointment => { 
    const interview = getInterview(state, appointment.interview);
    
    console.log("Interview",interview)
    
    return (
      <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time} 
      interview={interview} 
      interviewers={interviewers}
      bookInterview={bookInterview}
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
