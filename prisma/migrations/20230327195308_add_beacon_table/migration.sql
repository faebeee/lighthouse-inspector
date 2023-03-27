-- CreateTable
CREATE TABLE "Beacon" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beacon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beacon_key_key" ON "Beacon"("key");
