import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, subject, message, type } = body;

    if (!userId || !message) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Criar ticket de suporte
    const ticket = {
      id: `TKT${Date.now()}`,
      userId,
      subject: subject || 'Novo chamado',
      message,
      type: type || 'general',
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: 1,
          sender: 'user',
          message,
          timestamp: new Date().toISOString()
        }
      ]
    };

    return NextResponse.json({
      success: true,
      message: 'Chamado criado com sucesso!',
      ticket
    });

  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar ticket' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const ticketId = searchParams.get('ticketId');

    if (ticketId) {
      // Buscar ticket específico
      const ticket = {
        id: ticketId,
        userId: userId || 'user123',
        subject: 'Problema com DNS',
        status: 'open',
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: 1,
            sender: 'user',
            message: 'Meu domínio não está abrindo',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 2,
            sender: 'support',
            message: 'Olá! Vou verificar seu DNS agora mesmo.',
            timestamp: new Date(Date.now() - 1800000).toISOString()
          }
        ]
      };

      return NextResponse.json({ success: true, ticket });
    }

    // Listar tickets do usuário
    const tickets = [
      {
        id: 'TKT001',
        subject: 'Problema com DNS',
        status: 'open',
        date: new Date().toISOString(),
        lastMessage: 'Verificando configurações...'
      },
      {
        id: 'TKT002',
        subject: 'Renovação de domínio',
        status: 'closed',
        date: new Date(Date.now() - 86400000).toISOString(),
        lastMessage: 'Domínio renovado com sucesso!'
      }
    ];

    return NextResponse.json({ success: true, tickets });

  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar tickets' },
      { status: 500 }
    );
  }
}
