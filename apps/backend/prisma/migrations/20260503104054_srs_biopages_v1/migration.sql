-- CreateEnum
CREATE TYPE "Profession" AS ENUM ('CREATOR', 'DESIGNER', 'BARBER', 'DOCTOR', 'HOME_BUSINESS', 'CONTRACTOR', 'RESTAURANT', 'CHEF', 'FITNESS', 'MUSICIAN');

-- CreateEnum
CREATE TYPE "FeatureRequestCategory" AS ENUM ('NEW_SECTION_TYPE', 'NEW_VARIANT', 'NEW_PROFESSION', 'CUSTOMIZATION_OPTION', 'BUG', 'OTHER');

-- CreateEnum
CREATE TYPE "FeatureRequestStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'PLANNED', 'COMPLETED', 'DECLINED');

-- AlterTable
ALTER TABLE "BioPage" ADD COLUMN     "globalStyles" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "isPasswordProtected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "profession" "Profession" NOT NULL DEFAULT 'CREATOR',
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "versionHistory" JSONB NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "BioTemplate" (
    "id" TEXT NOT NULL,
    "profession" "Profession" NOT NULL,
    "variantName" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "config" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BioTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bioPageId" TEXT,
    "context" TEXT,
    "description" TEXT NOT NULL,
    "category" "FeatureRequestCategory" NOT NULL DEFAULT 'OTHER',
    "status" "FeatureRequestStatus" NOT NULL DEFAULT 'SUBMITTED',
    "isBlocking" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BioTemplate_profession_idx" ON "BioTemplate"("profession");

-- CreateIndex
CREATE INDEX "FeatureRequest_status_idx" ON "FeatureRequest"("status");

-- CreateIndex
CREATE INDEX "FeatureRequest_userId_idx" ON "FeatureRequest"("userId");

-- AddForeignKey
ALTER TABLE "FeatureRequest" ADD CONSTRAINT "FeatureRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureRequest" ADD CONSTRAINT "FeatureRequest_bioPageId_fkey" FOREIGN KEY ("bioPageId") REFERENCES "BioPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
