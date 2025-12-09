import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domínio não fornecido' },
        { status: 400 }
      );
    }

    // Simula consulta WHOIS e validação de domínio
    // Em produção, integrar com serviço real de WHOIS
    const isAvailable = Math.random() > 0.5;
    const hasExpiration = !isAvailable;

    const response = {
      domain,
      available: isAvailable,
      status: isAvailable ? 'disponível' : 'registrado',
      dns: isAvailable ? null : {
        nameservers: [
          'ns1.example.com',
          'ns2.example.com'
        ],
        records: {
          A: '192.168.1.1',
          MX: 'mail.example.com',
          TXT: 'v=spf1 include:_spf.example.com ~all'
        }
      },
      expirationDate: hasExpiration 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : null,
      registrar: isAvailable ? null : 'BLM DomainBox',
      createdDate: isAvailable ? null : new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
      updatedDate: isAvailable ? null : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao validar domínio:', error);
    return NextResponse.json(
      { error: 'Erro ao validar domínio' },
      { status: 500 }
    );
  }
}
