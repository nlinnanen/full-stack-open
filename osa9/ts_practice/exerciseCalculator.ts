interface exerciseValuation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseInput {
  exercises: Array<number>;
  target: number;
}

const calculateRating = (avg: number): [number, string] => {
  if (avg < 0.5) {
    return [1, 'Not great'];
  } else if (avg < 2) {
    return [2, 'Not too bad but could be better'];
  } else {
    return [3, 'Great'];
  }
};

export const calculateExercises = (
  exercises: Array<number>,
  target: number
): exerciseValuation => {
  const average = exercises.reduce((a, b) => a + b) / exercises.length;
  const [rating, ratingDescription] = calculateRating(average);
  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter((v) => v != 0).length,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArguments = (args: Array<string>): exerciseInput => {
  if (args.length < 2) throw new Error('Not enough arguments');
  const numArgs = args.slice(2).map((e) => Number(e));
  if (!numArgs.some(isNaN)) {
    return {
      target: numArgs[0],
      exercises: numArgs.slice(1)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
