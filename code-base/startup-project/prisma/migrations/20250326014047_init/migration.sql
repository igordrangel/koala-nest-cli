-- CreateTable
CREATE TABLE "person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person_phone" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "person_phone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "person_phone" ADD CONSTRAINT "person_phone_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
