-- CreateTable
CREATE TABLE "BonusCard" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "frozenBalance" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BonusCard_cardNumber_key" ON "BonusCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "BonusCard_userId_key" ON "BonusCard"("userId");

-- AddForeignKey
ALTER TABLE "BonusCard" ADD CONSTRAINT "BonusCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
