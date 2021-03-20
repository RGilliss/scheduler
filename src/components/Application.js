import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"


export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
      );
    }
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}

// const setDay = day => setState({ ...state, day });


// const [state, setState] = useState({
//   day: "Monday",
//   days: [],
//   appointments: {},
//   interviewers: {},
// }); 
// useEffect(() => {
//   Promise.all([
//     axios.get(`/api/days`),
//     axios.get(`/api/appointments`),
//     axios.get(`/api/interviewers`)
//   ])
//   .then((state) => {
//     setState(prev => ({...prev, 
//       days: state[0].data, 
//       appointments: state[1].data, 
//       interviewers: state[2].data}))
//     })
//     .catch(err => err.message)
//   }, []);

// function bookInterview(id, interview) {
  
  //   return axios.put(`/api/appointments/${id}`, {interview})
  //     .then(() => {
    //       const appointment = {
      //         ...state.appointments[id],
//         interview: { ...interview }
//       };
//       const appointments = {
  //         ...state.appointments,
//         [id]: appointment
//       };
//       setState({...state, appointments})})
//     // .catch(err => console.log("HEY"));

// }
// function cancelInterview(id) {
  
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(() => {
    //       const appointment = {...state.appointments[id], interview: null};
    //       const appointments = {
      //         ...state.appointments,
      //           [id]: appointment
      //       };
      //     setState({...state, appointments})})
      //     // .catch(err => console.log("HEY!"));
      
      // }
// const {
//   state,
//   setDay,
//   bookInterview,
//   cancelInterview
// } = useApplicationData();

  
// const appointments = getAppointmentsForDay(state, state.day);
// const interviewers = getInterviewersForDay(state, state.day);
      
// const schedule = appointments.map(appointment => { 
//   const interview = getInterview(state, appointment.interview);
  
//   return (
//     <Appointment 
//     key={appointment.id} 
//     id={appointment.id}
//     time={appointment.time} 
//     interview={interview} 
//     interviewers={interviewers}
//     bookInterview={bookInterview}
//     cancelInterview={cancelInterview}
//     />
//   )}
// );

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={state.days}
//             day={state.day}
//             setDay={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
//         <Appointment time={"5pm"} />
//       </section>
//     </main>
// );