-- DropForeignKey
ALTER TABLE "quiz" DROP CONSTRAINT "quiz_difficulty_id_fkey";

-- AlterTable
ALTER TABLE "quiz" ALTER COLUMN "difficulty_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_difficulty_id_fkey" FOREIGN KEY ("difficulty_id") REFERENCES "difficulty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
