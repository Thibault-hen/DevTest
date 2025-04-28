import type { User, Theme } from '@prisma/client';

const users = [
	{
		firstname: 'dede',
		lastname: 'dodo',
		email: 'test@test.fr',
		password: 'password',
	},
	{
		firstname: 'thibault',
		lastname: ':)',
		email: 'test@oclock.fr',
		password: 'password',
	},
	{
		firstname: 'francis',
		lastname: 'lallane',
		email: 'francis@test.fr',
		password: 'password',
	},
] as User[];

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

export { users, themes };
