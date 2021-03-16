import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function Button(props) {
  let name;
 
  const interviewerClass = classNames("interviewers__item", {
    //  "-image": props.avatar,
    "interviewers__item--selected": props.selected
  });
  if (props.selected) {
    name = props.name
  }

  return (
    <li
    onClick={() => props.setInterviewer(props.id)} 
    className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      {name}
    </li>
  
  );
};
