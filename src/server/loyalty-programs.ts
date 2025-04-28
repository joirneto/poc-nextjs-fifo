import { db } from '~/server/db';
import { loyaltyProgramsTable } from '~/server/db/schema';

export async function getLoyaltyPrograms() {
  return db.select().from(loyaltyProgramsTable);
}
