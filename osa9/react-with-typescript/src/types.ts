interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface ExtendedCoursePartBase extends CoursePartBase {
  description: string;
}

export interface CoursePartsProps {
  courseParts: Array<CoursePart>;
}

export interface CourseNormalPart extends ExtendedCoursePartBase {
  type: 'normal';
}
export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends ExtendedCoursePartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseRequirementPart extends ExtendedCoursePartBase {
  type: 'special';
  name: string;
  exerciseCount: number;
  description: string;
  requirements: string[];
}

export type CoursePart =
  | CourseRequirementPart
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart;
