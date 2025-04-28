import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '~/server/db';
import { loyaltyProgramsTable } from '~/server/db/schema';
import { getLoyaltyPrograms } from '~/server/loyalty-programs';

// Esquema de validação com Zod
const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  identifier: z.string().min(1, 'Identifier is required')
});

// GET: Listar usuários
export async function GET() {
  const users = await getLoyaltyPrograms();
  return NextResponse.json(users);
}

// POST: Criar um novo usuário
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = programSchema.parse(body);

    const program: typeof loyaltyProgramsTable.$inferInsert = {
      name: validatedData.name,
      identifier: validatedData.identifier
    };

    await db.insert(loyaltyProgramsTable).values(program);
    return NextResponse.json({ message: 'Program created' }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
