import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domainId, emailName, fullName } = await request.json();

    if (!domainId || !emailName) {
      return NextResponse.json(
        { error: 'Dados incompletos para criação de email' },
        { status: 400 }
      );
    }

    // Valida o nome do email
    if (!isValidEmailName(emailName)) {
      return NextResponse.json(
        { error: 'Nome de email inválido. Use apenas letras, números, pontos e hífens.' },
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

    // Gera senha aleatória segura
    const password = generateSecurePassword();

    // Cria a caixa de email
    const emailAccount = {
      emailId: `EMAIL-${Date.now()}`,
      email: `${emailName}@${domain.name}`,
      fullName: fullName || emailName,
      password,
      domain: domain.name,
      domainId,
      createdAt: new Date().toISOString(),
      status: 'ativo',
      quota: '10GB',
      settings: {
        imap: {
          server: `imap.${domain.name}`,
          port: 993,
          ssl: true
        },
        smtp: {
          server: `smtp.${domain.name}`,
          port: 587,
          tls: true
        },
        pop3: {
          server: `pop3.${domain.name}`,
          port: 995,
          ssl: true
        }
      },
      webmail: `https://webmail.${domain.name}`
    };

    // Simula criação no servidor de email
    await createEmailOnServer(emailAccount);

    return NextResponse.json({
      success: true,
      message: 'Email profissional criado com sucesso!',
      emailAccount: {
        ...emailAccount,
        passwordNote: 'Guarde esta senha em local seguro. Ela não poderá ser recuperada.'
      }
    });
  } catch (error) {
    console.error('Erro ao criar email:', error);
    return NextResponse.json(
      { error: 'Erro ao criar email profissional' },
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

    // Simula busca de emails do domínio
    const emails = [
      {
        emailId: 'EMAIL-1',
        email: 'contato@exemplo.com',
        fullName: 'Contato',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ativo',
        quota: '10GB',
        used: '2.3GB'
      },
      {
        emailId: 'EMAIL-2',
        email: 'suporte@exemplo.com',
        fullName: 'Suporte',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ativo',
        quota: '10GB',
        used: '1.1GB'
      }
    ];

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Erro ao buscar emails:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar emails' },
      { status: 500 }
    );
  }
}

function isValidEmailName(name: string): boolean {
  const regex = /^[a-zA-Z0-9._-]+$/;
  return regex.test(name) && name.length >= 2 && name.length <= 64;
}

function generateSecurePassword(): string {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

async function getDomainById(domainId: string) {
  // Simula busca no banco de dados
  return {
    id: domainId,
    name: 'exemplo.com'
  };
}

async function createEmailOnServer(emailAccount: any) {
  // Simula criação no servidor de email
  console.log('Criando email no servidor:', emailAccount.email);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
}
