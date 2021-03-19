import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Header from "components/Appointment/Header"
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode"
// import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
  console.log("Props",props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message))
  }


  return (
   <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onEdit={() => transition(CREATE)}
        // onDelete={action("onDelete")}
      />
    )}
    {mode === CREATE && (
    <Form
    //  name={name}
    //  value={name}
    //  onChange={(event) => setName(event.target.value)}
      interviewers={props.interviewers}
      type="text"
      placeholder="Enter Student Name"
      onSubmit={event => event.preventDefault()}
      onCancel={() => transition(EMPTY)}
      onSave={save}

     />)}
     {mode === SAVING && <Status message={"saving"}/>}
   </article>
  );
};
