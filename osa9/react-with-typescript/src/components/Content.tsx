import React from 'react';
import { CoursePart, CoursePartsProps } from '../types';

const Content = ({ courseParts }: CoursePartsProps) => {
  return (
    <>
      {courseParts.map((part) => (
        <Course {...part} key={part.name} />
      ))}
    </>
  );
};

const Course = (props: CoursePart) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.type) {
    case 'normal':
      return (
        <p>
          <div>
            <strong>{props.name + ' ' + props.exerciseCount}</strong>
          </div>
          <div>{props.description}</div>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <div>
            <strong>{props.name + ' ' + props.exerciseCount}</strong>
          </div>
          <div>{'project exercises' + props.groupProjectCount}</div>
        </p>
      );
    case 'submission':
      return (
        <p>
          <div>
            <strong>{props.name + ' ' + props.exerciseCount}</strong>
          </div>
          <div>{props.description}</div>
          <div>{props.exerciseSubmissionLink}</div>
        </p>
      );
    case 'special':
      return (
        <p>
          <div>
            <strong>{props.name + ' ' + props.exerciseCount}</strong>
          </div>
          <div>{props.description}</div>
          <div>{'required skills: ' + props.requirements.join(', ')}</div>
        </p>
      );
    default:
      return assertNever(props);
  }
};

export default Content;
