import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(req: Request) {
  try {
    const { nome, whatsapp, interesse, email, role, company, objetivo } = await req.json();

    if (!nome || !whatsapp || !interesse || !email || !objetivo) {
      return new NextResponse(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400, headers: corsHeaders() }
      );
    }

    const cadastro = await prisma.sorteio.create({
      data: { nome, whatsapp, interesse, email, role, company, objetivo },
    });

    return new NextResponse(JSON.stringify(cadastro), {
      status: 201,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro ao cadastrar participante." }),
      { status: 500, headers: corsHeaders() }
    );
  }
}
