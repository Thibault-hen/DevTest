import { PrismaClient } from '@prisma/client';
import { users, themes } from '../data/seedData';

const prisma = new PrismaClient();

const main = async () => {
	try {
		await prisma.user.deleteMany();
		await prisma.user.createMany({ data: users });
		await prisma.theme.deleteMany();
		await prisma.theme.createMany({ data: themes });
		console.log('database seeded');
	} catch (err) {
		console.error('something went wrong while seeding the database', err);
	}
};

main();
