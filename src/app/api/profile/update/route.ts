import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, email, phone, password, photoUrl } = body;

    // Validação básica
    if (!userId || !name || !email) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validação de telefone (se fornecido)
    if (phone && phone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Telefone inválido' },
        { status: 400 }
      );
    }

    // Simulação de atualização no banco de dados
    const updatedProfile = {
      userId,
      name,
      email,
      phone: phone || null,
      photoUrl: photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00a82d&color=fff&size=128`,
      updatedAt: new Date().toISOString()
    };

    // Se senha foi alterada, simular atualização
    if (password && password.length >= 6) {
      // Em produção, fazer hash da senha antes de salvar
      updatedProfile['passwordUpdated'] = true;
    }

    return NextResponse.json({
      success: true,
      message: 'Perfil atualizado com sucesso!',
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar perfil' },
      { status: 500 }
    );
  }
}
