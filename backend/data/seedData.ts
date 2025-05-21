import type { User, Theme, Difficulty, QuizImage, Quiz } from '@prisma/client';
import argon2, { argon2id } from 'argon2';

const password = 'password';

const hashedPassword = await argon2.hash(password, {
  type: argon2id,
});

const users = [
  {
    firstname: 'dede',
    lastname: 'dodo',
    email: 'test@test.fr',
    password: hashedPassword,
    specialization: 'Développeur Backend',
    role: 'ADMIN',
  },
  {
    firstname: 'thibault',
    lastname: ':)',
    email: 'test@oclock.fr',
    password: hashedPassword,
    specialization: 'Développeur Frontend',
  },
  {
    firstname: 'francis',
    lastname: 'lallane',
    email: 'francis@test.fr',
    password: hashedPassword,
    specialization: 'Développeur Fullstack',
  },
] as User[];

const difficulties = [
  { name: 'Facile' },
  { name: 'Intermédiaire' },
  { name: 'Difficile' },
] as Difficulty[];

const quizImages = [
  {
    imageUrl: 'https://www.svgrepo.com/show/353884/html-5.svg',
    altText: 'HTML 5',
  },
  {
    imageUrl: 'https://www.svgrepo.com/show/452185/css-3.svg',
    altText: 'CSS 3',
  },
  {
    imageUrl: 'https://www.svgrepo.com/show/353925/javascript.svg',
    altText: 'JavaScript',
  },
] as QuizImage[];

const themes = [
  { title: 'Développeur Backend' },
  { title: 'Développeur Frontend' },
  { title: 'DevOps' },
  { title: 'Fullstack' },
  { title: 'Data Engineer' },
  { title: 'Data Scientist' },
  { title: 'Sécurité' },
  { title: 'Développement Mobile' },
  { title: 'Intelligence Artificielle' },
  { title: 'Game Dev' },
  { title: 'Product Management' },
  { title: 'UI/UX Design' },
  { title: 'Tests & Qualité' },
  { title: 'Systèmes & Réseaux' },
  { title: 'Cloud Computing' },
] as Theme[];

const quizzes = [
  {
    title: "Base de l'HTML 5",
    description: 'Testez vos connaissances sur HTML 5',
    estimatedTime: 10,
  },
  {
    title: 'Base du CSS 3',
    description: 'Testez vos connaissances sur CSS 3',
    estimatedTime: 10,
  },
  {
    title: 'Base du JavaScript',
    description: 'Testez vos connaissances sur JavaScript',
    estimatedTime: 15,
  },
] as Quiz[];

const questions = [
  {
    quizTitle: "Base de l'HTML 5",
    questions: [
      {
        description: 'Quel élément HTML est utilisé pour insérer une image ?',
        is_multiple: false,
      },
      {
        description:
          'Quelle balise est utilisée pour créer un lien hypertexte ?',
        is_multiple: false,
      },
    ],
  },
  {
    quizTitle: 'Base du CSS 3',
    questions: [
      {
        description: 'Quel est le sélecteur CSS pour un identifiant ?',
        is_multiple: false,
      },
      {
        description:
          'Quelle propriété CSS est utilisée pour changer la couleur du texte ?',
        is_multiple: false,
      },
    ],
  },
  {
    quizTitle: 'Base du JavaScript',
    questions: [
      {
        description:
          'Quelle méthode est utilisée pour afficher quelque chose dans la console ?',
        is_multiple: false,
      },
      {
        description: 'Comment déclare-t-on une variable en JavaScript ?',
        is_multiple: true,
      },
    ],
  },
];

const answers = [
  {
    questionTitle: 'Quel élément HTML est utilisé pour insérer une image ?',
    answers: [
      { description: '<img>', is_correct: true },
      { description: '<image>', is_correct: false },
      { description: '<picture>', is_correct: false },
      { description: '<src>', is_correct: false },
    ],
  },
  {
    questionTitle: 'Quelle balise est utilisée pour créer un lien hypertexte ?',
    answers: [
      { description: '<a>', is_correct: true },
      { description: '<link>', is_correct: false },
      { description: '<href>', is_correct: false },
      { description: '<url>', is_correct: false },
    ],
  },
  {
    questionTitle: 'Quel est le sélecteur CSS pour un identifiant ?',
    answers: [
      { description: '#monId', is_correct: true },
      { description: '.monId', is_correct: false },
      { description: '*monId', is_correct: false },
      { description: '/monId', is_correct: false },
    ],
  },
  {
    questionTitle:
      'Quelle propriété CSS est utilisée pour changer la couleur du texte ?',
    answers: [
      { description: 'color', is_correct: true },
      { description: 'background-color', is_correct: false },
      { description: 'font-color', is_correct: false },
      { description: 'text-color', is_correct: false },
    ],
  },
  {
    questionTitle:
      'Quelle méthode est utilisée pour afficher quelque chose dans la console ?',
    answers: [
      { description: 'console.log()', is_correct: true },
      { description: 'print()', is_correct: false },
      { description: 'log()', is_correct: false },
      { description: 'echo()', is_correct: false },
    ],
  },
  {
    questionTitle: 'Comment déclare-t-on une variable en JavaScript ?',
    answers: [
      { description: 'var', is_correct: true },
      { description: 'let', is_correct: true },
      { description: 'const', is_correct: true },
      { description: 'define', is_correct: false },
    ],
  },
];

export { users, themes, difficulties, quizImages, quizzes, questions, answers };
