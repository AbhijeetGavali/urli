-- CreateTable
CREATE TABLE "BioClick" (
    "id" TEXT NOT NULL,
    "bioPageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BioClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BioClick_bioPageId_idx" ON "BioClick"("bioPageId");

-- CreateIndex
CREATE INDEX "BioClick_createdAt_idx" ON "BioClick"("createdAt");

-- AddForeignKey
ALTER TABLE "BioClick" ADD CONSTRAINT "BioClick_bioPageId_fkey" FOREIGN KEY ("bioPageId") REFERENCES "BioPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
