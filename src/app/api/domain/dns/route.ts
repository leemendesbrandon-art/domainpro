import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domainId, dnsRecords } = await request.json();

    if (!domainId || !dnsRecords) {
      return NextResponse.json(
        { error: 'Dados incompletos para configuração de DNS' },
        { status: 400 }
      );
    }

    // Valida os registros DNS
    const validation = validateDNSRecords(dnsRecords);

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Registros DNS inválidos', details: validation.errors },
        { status: 400 }
      );
    }

    // Simula atualização dos registros DNS
    const dnsUpdate = {
      domainId,
      updateId: `DNS-${Date.now()}`,
      records: dnsRecords,
      updatedAt: new Date().toISOString(),
      status: 'propagating',
      propagationTime: '24-48 horas',
      nameservers: [
        'ns1.blmdomainbox.com',
        'ns2.blmdomainbox.com'
      ]
    };

    // Simula envio para servidor DNS
    await updateDNSServer(domainId, dnsRecords);

    return NextResponse.json({
      success: true,
      message: 'Registros DNS atualizados com sucesso!',
      dnsUpdate
    });
  } catch (error) {
    console.error('Erro ao configurar DNS:', error);
    return NextResponse.json(
      { error: 'Erro ao configurar DNS' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domainId = searchParams.get('domainId');

    if (!domainId) {
      return NextResponse.json(
        { error: 'ID do domínio não fornecido' },
        { status: 400 }
      );
    }

    // Simula busca dos registros DNS atuais
    const currentDNS = {
      domainId,
      records: {
        A: [
          { name: '@', value: '192.168.1.1', ttl: 3600 },
          { name: 'www', value: '192.168.1.1', ttl: 3600 }
        ],
        AAAA: [],
        CNAME: [
          { name: 'blog', value: 'exemplo.com', ttl: 3600 }
        ],
        MX: [
          { name: '@', value: 'mail.exemplo.com', priority: 10, ttl: 3600 }
        ],
        TXT: [
          { name: '@', value: 'v=spf1 include:_spf.blmdomainbox.com ~all', ttl: 3600 }
        ],
        NS: [
          { name: '@', value: 'ns1.blmdomainbox.com', ttl: 86400 },
          { name: '@', value: 'ns2.blmdomainbox.com', ttl: 86400 }
        ]
      },
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    return NextResponse.json(currentDNS);
  } catch (error) {
    console.error('Erro ao buscar DNS:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar registros DNS' },
      { status: 500 }
    );
  }
}

function validateDNSRecords(records: any) {
  const errors: string[] = [];

  // Validações básicas
  if (records.A) {
    records.A.forEach((record: any, index: number) => {
      if (!isValidIPv4(record.value)) {
        errors.push(`Registro A[${index}]: IP inválido`);
      }
    });
  }

  if (records.AAAA) {
    records.AAAA.forEach((record: any, index: number) => {
      if (!isValidIPv6(record.value)) {
        errors.push(`Registro AAAA[${index}]: IPv6 inválido`);
      }
    });
  }

  if (records.MX) {
    records.MX.forEach((record: any, index: number) => {
      if (!record.priority || record.priority < 0) {
        errors.push(`Registro MX[${index}]: Prioridade inválida`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function isValidIPv4(ip: string): boolean {
  const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!regex.test(ip)) return false;
  
  const parts = ip.split('.');
  return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
}

function isValidIPv6(ip: string): boolean {
  const regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
  return regex.test(ip);
}

async function updateDNSServer(domainId: string, records: any) {
  // Simula envio para servidor DNS
  console.log(`Atualizando DNS para domínio ${domainId}`, records);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}
