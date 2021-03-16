import React, { useState } from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map(eachInterviewer => {
    return (
      <li key={eachInterviewer.id}>
      <InterviewerListItem
        name={eachInterviewer.name} 
        avatar={eachInterviewer.avatar} 
        selected={eachInterviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(eachInterviewer.id)} />
      </li>
    )
  });

return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul  className="interviewers__list">
    {interviewerList}
    </ul>
  </section>
    );
};
