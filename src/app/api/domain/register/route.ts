import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domain, period, paymentMethod, userInfo } = await request.json();

    if (!domain || !period || !paymentMethod || !userInfo) {
      return NextResponse.json(
        { error: 'Dados incompletos para registro' },
        { status: 400 }
      );
    }

    // Simula processamento de pagamento
    const paymentProcessed = await processPayment(paymentMethod, period);

    if (!paymentProcessed.success) {
      return NextResponse.json(
        { error: 'Falha no processamento do pagamento' },
        { status: 402 }
      );
    }

    // Simula registro do domínio
    const registration = {
      domain,
      registrationId: `REG-${Date.now()}`,
      status: 'ativo',
      registeredAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + period * 365 * 24 * 60 * 60 * 1000).toISOString(),
      owner: userInfo,
      dns: {
        nameservers: [
          'ns1.blmdomainbox.com',
          'ns2.blmdomainbox.com'
        ],
        defaultRecords: {
          A: '0.0.0.0',
          MX: `mail.${domain}`,
          TXT: 'v=spf1 include:_spf.blmdomainbox.com ~all'
        }
      },
      paymentInfo: {
        transactionId: paymentProcessed.transactionId,
        amount: paymentProcessed.amount,
        method: paymentMethod
      }
    };

    // Simula envio de email de confirmação
    await sendConfirmationEmail(userInfo.email, registration);

    return NextResponse.json({
      success: true,
      message: 'Domínio registrado com sucesso!',
      registration
    });
  } catch (error) {
    console.error('Erro ao registrar domínio:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar domínio' },
      { status: 500 }
    );
  }
}

async function processPayment(method: string, period: number) {
  // Simula processamento de pagamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const basePrice = 49.90;
  const amount = basePrice * period;

  return {
    success: true,
    transactionId: `TXN-${Date.now()}`,
    amount,
    method
  };
}

async function sendConfirmationEmail(email: string, registration: any) {
  // Simula envio de email
  console.log(`Email de confirmação enviado para ${email}`, registration);
  return true;
}
