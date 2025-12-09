import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Lista completa de extensões disponíveis
    const allExtensions = [
      // Genéricas populares
      { extension: '.com', price: 49.90, category: 'popular', description: 'Mais popular do mundo' },
      { extension: '.net', price: 54.90, category: 'popular', description: 'Para redes e tecnologia' },
      { extension: '.org', price: 54.90, category: 'popular', description: 'Para organizações' },
      { extension: '.info', price: 44.90, category: 'popular', description: 'Para informação' },
      { extension: '.biz', price: 49.90, category: 'popular', description: 'Para negócios' },
      
      // Brasil
      { extension: '.com.br', price: 39.90, category: 'brasil', description: 'Domínio brasileiro comercial' },
      { extension: '.net.br', price: 39.90, category: 'brasil', description: 'Domínio brasileiro para redes' },
      { extension: '.org.br', price: 39.90, category: 'brasil', description: 'Domínio brasileiro para organizações' },
      { extension: '.blog.br', price: 39.90, category: 'brasil', description: 'Para blogs brasileiros' },
      
      // Negócios
      { extension: '.store', price: 64.90, category: 'negocios', description: 'Para lojas online' },
      { extension: '.shop', price: 59.90, category: 'negocios', description: 'Para e-commerce' },
      { extension: '.online', price: 49.90, category: 'negocios', description: 'Presença online' },
      { extension: '.site', price: 44.90, category: 'negocios', description: 'Para websites' },
      { extension: '.business', price: 69.90, category: 'negocios', description: 'Para empresas' },
      
      // Tecnologia
      { extension: '.tech', price: 64.90, category: 'tecnologia', description: 'Para tecnologia' },
      { extension: '.app', price: 69.90, category: 'tecnologia', description: 'Para aplicativos' },
      { extension: '.dev', price: 74.90, category: 'tecnologia', description: 'Para desenvolvedores' },
      { extension: '.io', price: 79.90, category: 'tecnologia', description: 'Para startups tech' },
      { extension: '.ai', price: 99.90, category: 'tecnologia', description: 'Para inteligência artificial' },
      
      // Criativo
      { extension: '.design', price: 64.90, category: 'criativo', description: 'Para designers' },
      { extension: '.art', price: 69.90, category: 'criativo', description: 'Para artistas' },
      { extension: '.photography', price: 74.90, category: 'criativo', description: 'Para fotógrafos' },
      { extension: '.studio', price: 64.90, category: 'criativo', description: 'Para estúdios' },
      
      // Outros
      { extension: '.blog', price: 54.90, category: 'outros', description: 'Para blogs' },
      { extension: '.news', price: 64.90, category: 'outros', description: 'Para notícias' },
      { extension: '.club', price: 49.90, category: 'outros', description: 'Para clubes e comunidades' },
      { extension: '.vip', price: 89.90, category: 'outros', description: 'Para conteúdo premium' },
      { extension: '.pro', price: 59.90, category: 'outros', description: 'Para profissionais' }
    ];

    // Filtra por categoria se fornecida
    const extensions = category 
      ? allExtensions.filter(ext => ext.category === category)
      : allExtensions;

    // Adiciona disponibilidade (simulada)
    const extensionsWithAvailability = extensions.map(ext => ({
      ...ext,
      available: Math.random() > 0.1, // 90% de disponibilidade
      registrationPeriod: '1 ano',
      renewalPrice: ext.price,
      features: [
        'DNS gratuito',
        'Proteção de privacidade',
        'Suporte 24/7',
        'Certificado SSL gratuito'
      ]
    }));

    return NextResponse.json({
      total: extensionsWithAvailability.length,
      categories: ['popular', 'brasil', 'negocios', 'tecnologia', 'criativo', 'outros'],
      extensions: extensionsWithAvailability
    });
  } catch (error) {
    console.error('Erro ao listar extensões:', error);
    return NextResponse.json(
      { error: 'Erro ao listar extensões de domínio' },
      { status: 500 }
    );
  }
}
