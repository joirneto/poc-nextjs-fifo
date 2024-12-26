import { sql } from "drizzle-orm";
import { int, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const loyaltyProgramsTable = sqliteTable("loyalty_programs_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  identifier: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),  // Adicionando o campo createdAt com valor padrão para o momento atual
  updatedAt: text().default(sql`(CURRENT_TIMESTAMP)`), 
});

