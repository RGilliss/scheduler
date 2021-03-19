import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header"
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode"
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
  console.log("Props",props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("mode", mode)
  return (
   <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(CREATE)}
        // onDelete={action("onDelete")}
      />
    )}
    {mode === CREATE && (
    <Form
    //  name={name}
    //  value={name}
    interviewers={props.interviewers}
     type="text"
     placeholder="Enter Student Name"
    //  onChange={(event) => setName(event.target.value)}
     onSubmit={event => event.preventDefault()}
     onCancel={() => transition(EMPTY)}
     />)}
   </article>
  );
};
