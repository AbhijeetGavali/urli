-- AlterTable
ALTER TABLE "BioPage" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sections" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "template" TEXT NOT NULL DEFAULT 'minimal';
