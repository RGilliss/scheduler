//Pushes each days appointments into an array
export function getAppointmentsForDay(state, day) {
  let apps = [];
  for (const eachDay of state.days) {
    if (eachDay.name === day) {
      const appointments = eachDay.appointments;
      for (const id of appointments) {
        apps.push(state.appointments[id]);
      }
    }
  }
  return apps;
};

//Creates an interview object
export function getInterview(state, interview) {
  if (!state ||!interview ||!Object.getOwnPropertyNames(state.interviewers)[0]) {
    return null;
  }
  let int = {};
  let id = interview.interviewer ? interview.interviewer : 1;

  if (state.interviewers[id].id === interview.interviewer) {
    int = {
      interviewer: { ...state.interviewers[id] },
      student: interview.student,
    };
  }
  return int;
};

//Pushes each days interviewers into an array
export function getInterviewersForDay(state, day) {
  let ints = [];
  for (const days of state.days) {
    if (days.name === day) {
      for (const id of days.interviewers) {
        ints.push(state.interviewers[id]);
      }
    }
  }
  return ints;
};
