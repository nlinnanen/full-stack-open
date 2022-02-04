import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const heightNum = Number(height);
  const weightNum = Number(weight);
  if (isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).json({ error: 'Height and weight are not numbers!' });
  }
  res.status(200).json({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(heightNum, weightNum)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const exercises: any = req.body.daily_exercises;
  // eslint-disable-next-line
  const target: any = req.body.target;

  if (!target || !exercises) {
    res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line
  const numExercises: Array<any> = exercises.map((e: any) => Number(e));
  if (target && exercises && !numExercises.some(isNaN)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.status(200).json(calculateExercises(numExercises, target));
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
