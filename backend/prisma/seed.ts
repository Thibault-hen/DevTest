import {
  PrismaClient,
  type Quiz,
  Result,
  type User,
  type Question,
} from '@prisma/client';
import {
  users,
  themes,
  quizImages,
  difficulties,
  quizzes,
  questions,
  answers,
} from '../data/seedData';

const prisma = new PrismaClient();

const createQuestions = async (quizIds: Quiz[]): Promise<Question[]> => {
  const questionIds = [] as Question[];
  for (const data of questions) {
    const quiz = quizIds.find((quiz) => quiz.title === data.quizTitle);
    if (!quiz) continue;

    const createdQuestion = await Promise.all(
      data.questions.map(async (question) => {
        return await prisma.question.create({
          data: {
            ...question,
            quizId: quiz.id,
          },
        });
      }),
    );
    questionIds.push(...createdQuestion);
  }
  return questionIds;
};

const createAnswers = async (questionIds: Question[]) => {
  for (const data of answers) {
    const question = questionIds.find(
      (question) => question.description === data.questionTitle,
    );
    if (!question) continue;

    await Promise.all(
      data.answers.map(async (answer) => {
        return await prisma.answer.create({
          data: {
            ...answer,
            questionId: question.id,
          },
        });
      }),
    );
  }
};

const createUserAnswerResult = async (userIds: User[], quizIds: Quiz[]) => {
  const resultIds = await prisma.result.createManyAndReturn({
    data: userIds.map((user) => ({
      userId: user.id,
      quizId: quizIds[Math.floor(Math.random() * quizIds.length)].id,
    })),
  });

  for (let i = 0; i < resultIds.length; i++) {
    const foundQuestions = await prisma.question.findMany({
      where: {
        quizId: resultIds[i].quizId,
      },
    });

    for (const foundQuestion of foundQuestions) {
      const foundAnswers = await prisma.answer.findMany({
        where: {
          questionId: foundQuestion.id,
        },
      });

      const randomAnswer =
        foundAnswers[Math.floor(Math.random() * foundAnswers.length)];

      await prisma.result_User_Answer.create({
        data: {
          resultId: resultIds[i].id,
          answerId: randomAnswer.id,
        },
      });
    }
  }
};
const main = async () => {
  try {
    const userIds = await prisma.user.createManyAndReturn({ data: users });
    const themeIds = await prisma.theme.createManyAndReturn({ data: themes });
    const quizImageIds = await prisma.quizImage.createManyAndReturn({
      data: quizImages,
    });
    const difficultyIds = await prisma.difficulty.createManyAndReturn({
      data: difficulties,
    });
    const quizIds = await Promise.all(
      quizzes.map(async (quiz, index) => {
        return await prisma.quiz.create({
          data: {
            ...quiz,
            authorId: userIds[index % userIds.length].id,
            difficultyId: difficultyIds[index % difficultyIds.length].id,
            quizImageId: quizImageIds[index % quizImageIds.length].id,
            themes: {
              connect: {
                id: themeIds[index % themeIds.length].id,
              },
            },
          },
        });
      }),
    );
    const questionIds = await createQuestions(quizIds);
    await createAnswers(questionIds);
    await createUserAnswerResult(userIds, quizIds);

    console.log('database seeded');
  } catch (err) {
    console.error('something went wrong while seeding the database', err);
  }
};

main();
