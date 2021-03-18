export default function getAppointmentsForDay(state, day) {
  let apps = []
  for (const eachDay of state.days) {
    if (eachDay.name === day) {
      const appointments = eachDay.appointments;
      for (let id of appointments) {
        apps.push(state.appointments[id]);
      }
    }
  }
  return apps;
}


