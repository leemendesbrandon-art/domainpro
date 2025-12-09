import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domainId, period, paymentMethod } = await request.json();

    if (!domainId || !period || !paymentMethod) {
      return NextResponse.json(
        { error: 'Dados incompletos para renovação' },
        { status: 400 }
      );
    }

    // Simula busca do domínio
    const domain = await getDomainById(domainId);

    if (!domain) {
      return NextResponse.json(
        { error: 'Domínio não encontrado' },
        { status: 404 }
      );
    }

    // Simula processamento de pagamento
    const basePrice = 49.90;
    const amount = basePrice * period;

    const paymentProcessed = await processRenewalPayment(paymentMethod, amount);

    if (!paymentProcessed.success) {
      return NextResponse.json(
        { error: 'Falha no processamento do pagamento' },
        { status: 402 }
      );
    }

    // Calcula nova data de expiração
    const currentExpiration = new Date(domain.expiresAt);
    const newExpiration = new Date(currentExpiration.getTime() + period * 365 * 24 * 60 * 60 * 1000);

    const renewal = {
      domainId,
      domain: domain.name,
      renewalId: `REN-${Date.now()}`,
      previousExpiration: domain.expiresAt,
      newExpiration: newExpiration.toISOString(),
      period,
      amount,
      transactionId: paymentProcessed.transactionId,
      renewedAt: new Date().toISOString(),
      status: 'ativo'
    };

    return NextResponse.json({
      success: true,
      message: 'Domínio renovado com sucesso!',
      renewal
    });
  } catch (error) {
    console.error('Erro ao renovar domínio:', error);
    return NextResponse.json(
      { error: 'Erro ao renovar domínio' },
      { status: 500 }
    );
  }
}

async function getDomainById(domainId: string) {
  // Simula busca no banco de dados
  return {
    id: domainId,
    name: 'exemplo.com',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
}

async function processRenewalPayment(method: string, amount: number) {
  // Simula processamento de pagamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    transactionId: `TXN-${Date.now()}`,
    amount,
    method
  };
}
