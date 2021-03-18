export default function getAppointmentsForDay(state, day) {
  let apps = []
  console.log("State.days:", state.days);
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
// export function getAppointmentsForDay(state, day) {
//   let result = []
//   const appDay = state.days.filter(eachDay => eachDay.name === day);
//   const apps = appDay[0].appointments;
//   for (let id of apps) {
//     if (id == state.appointments[id].id) {
//       result.push(state.appointments[id]);
//     }
//   };
//   console.log("result", result)
//   return result;
// }

