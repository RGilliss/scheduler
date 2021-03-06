import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((state) => {
        setState((prev) => ({
          ...prev,
          days: state[0].data,
          appointments: state[1].data,
          interviewers: state[2].data,
        }));
      })
      .catch((err) => err.message);
  }, []);

  //Counts the number of appointments that are null
  const numSpots = function (day, appointments) {
    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    return spots;
  };

  //Updates the spots value with number set by numSpots
  const UpdateSpots
   = function (days, appointments) {
    const arr = days.map((day) => ({
      ...day,
      spots: numSpots(day, appointments),
    }));
    return arr;
  };

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      setState({...state,
        appointments,
        days: UpdateSpots(state.days, appointments),
      });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = { ...state.appointments[id], interview: null };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState({
        ...state,
        appointments,
        days: UpdateSpots(state.days, appointments),
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
