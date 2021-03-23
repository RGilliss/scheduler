import React from "react";
import "components/Appointment/styles.scss";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Header from "components/Appointment/Header";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
// import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
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
          onSubmit={(event) => event.preventDefault()}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          //  value={name}
          //  onChange={(event) => setName(event.target.value)}
          interviewers={props.interviewers}
          type="text"
          placeholder="Enter Student Name"
          onSubmit={(event) => event.preventDefault()}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={onDelete}
          message={"Delete the appointment?"}
        />
      )}
      {mode === SAVING && <Status message={"saving"} />}
      {mode === DELETING && <Status message={"deleting"} />}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()} message={"Error deleting appointment"} />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()} message={"Error saving appointment"} />
      )}
    </article>
  );
}
