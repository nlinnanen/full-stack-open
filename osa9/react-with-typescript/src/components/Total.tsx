import React from 'react';
import { CoursePartsProps } from '../types';

const Total = (props: CoursePartsProps) => {
  return (
    <p>
      Number of exercises{' '}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
