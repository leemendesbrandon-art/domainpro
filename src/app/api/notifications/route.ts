import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    // Simulação de notificações do banco
    const notifications = [
      {
        id: 1,
        userId,
        title: 'Domínio Registrado',
        message: 'Seu domínio blmmybox.com foi registrado com sucesso!',
        date: new Date().toISOString(),
        read: false,
        type: 'success'
      },
      {
        id: 2,
        userId,
        title: 'Renovação Próxima',
        message: 'Seu domínio example.com vence em 30 dias',
        date: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        type: 'warning'
      },
      {
        id: 3,
        userId,
        title: 'Promoção Especial',
        message: '50% OFF em domínios .tech até o fim do mês!',
        date: new Date(Date.now() - 86400000).toISOString(),
        read: true,
        type: 'info'
      }
    ];

    return NextResponse.json({
      success: true,
      notifications: notifications.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    });

  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar notificações' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, notificationId, action } = body;

    if (!userId || !notificationId) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }

    if (action === 'markAsRead') {
      return NextResponse.json({
        success: true,
        message: 'Notificação marcada como lida'
      });
    }

    if (action === 'delete') {
      return NextResponse.json({
        success: true,
        message: 'Notificação excluída'
      });
    }

    if (action === 'markAllAsRead') {
      return NextResponse.json({
        success: true,
        message: 'Todas as notificações marcadas como lidas'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Ação inválida' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Erro ao processar notificação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar notificação' },
      { status: 500 }
    );
  }
}
