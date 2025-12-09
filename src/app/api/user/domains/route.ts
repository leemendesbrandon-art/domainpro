import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário não fornecido' },
        { status: 400 }
      );
    }

    // Simula busca de domínios do usuário
    const domains = [
      {
        id: 'DOM-1',
        domain: 'meusite.com',
        status: 'ativo',
        registeredAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: true,
        dns: {
          nameservers: ['ns1.blmdomainbox.com', 'ns2.blmdomainbox.com']
        },
        services: {
          email: true,
          ssl: true,
          privacy: true
        },
        price: 49.90
      },
      {
        id: 'DOM-2',
        domain: 'minhaloja.com.br',
        status: 'ativo',
        registeredAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: false,
        dns: {
          nameservers: ['ns1.blmdomainbox.com', 'ns2.blmdomainbox.com']
        },
        services: {
          email: true,
          ssl: true,
          privacy: false
        },
        price: 39.90
      },
      {
        id: 'DOM-3',
        domain: 'startup.tech',
        status: 'expirando',
        registeredAt: new Date(Date.now() - 350 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        autoRenew: false,
        dns: {
          nameservers: ['ns1.blmdomainbox.com', 'ns2.blmdomainbox.com']
        },
        services: {
          email: false,
          ssl: true,
          privacy: true
        },
        price: 64.90
      }
    ];

    return NextResponse.json({
      userId,
      total: domains.length,
      active: domains.filter(d => d.status === 'ativo').length,
      expiring: domains.filter(d => d.status === 'expirando').length,
      domains
    });
  } catch (error) {
    console.error('Erro ao buscar domínios:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar domínios do usuário' },
      { status: 500 }
    );
  }
}
