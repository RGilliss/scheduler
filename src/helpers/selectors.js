export function getAppointmentsForDay(state, day) {
  let apps = []
  for (const eachDay of state.days) {
    if (eachDay.name === day) {
      const appointments = eachDay.appointments;
      for (let id of appointments) {
        if (id == state.appointments[id].id) {
          apps.push(state.appointments[id]);
        }
      }
    }
  }
  return apps;
}