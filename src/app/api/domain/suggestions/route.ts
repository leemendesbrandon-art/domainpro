import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { keyword, limit = 20 } = await request.json();

    if (!keyword) {
      return NextResponse.json(
        { error: 'Palavra-chave não fornecida' },
        { status: 400 }
      );
    }

    // Gera sugestões de nomes
    const suggestions = generateDomainSuggestions(keyword, limit);

    // Verifica disponibilidade de cada sugestão (simulado)
    const suggestionsWithAvailability = await Promise.all(
      suggestions.map(async (suggestion) => {
        const available = Math.random() > 0.3; // 70% de disponibilidade
        return {
          domain: suggestion.domain,
          extension: suggestion.extension,
          available,
          price: suggestion.price,
          category: suggestion.category,
          score: suggestion.score
        };
      })
    );

    // Ordena por disponibilidade e score
    const sortedSuggestions = suggestionsWithAvailability.sort((a, b) => {
      if (a.available !== b.available) {
        return a.available ? -1 : 1;
      }
      return b.score - a.score;
    });

    return NextResponse.json({
      keyword,
      total: sortedSuggestions.length,
      available: sortedSuggestions.filter(s => s.available).length,
      suggestions: sortedSuggestions
    });
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar sugestões de domínio' },
      { status: 500 }
    );
  }
}

function generateDomainSuggestions(keyword: string, limit: number) {
  const suggestions = [];
  const cleanKeyword = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Prefixos comuns
  const prefixes = ['get', 'my', 'the', 'try', 'use', 'go', 'new', 'best', 'top', 'pro'];
  
  // Sufixos comuns
  const suffixes = ['app', 'hub', 'lab', 'zone', 'spot', 'now', 'online', 'web', 'digital', 'tech'];

  // Extensões populares
  const extensions = [
    { ext: '.com', price: 49.90 },
    { ext: '.net', price: 54.90 },
    { ext: '.com.br', price: 39.90 },
    { ext: '.store', price: 64.90 },
    { ext: '.online', price: 49.90 },
    { ext: '.tech', price: 64.90 },
    { ext: '.app', price: 69.90 },
    { ext: '.io', price: 79.90 }
  ];

  // Domínio exato com diferentes extensões
  extensions.forEach(({ ext, price }) => {
    suggestions.push({
      domain: `${cleanKeyword}${ext}`,
      extension: ext,
      price,
      category: 'exact',
      score: 100
    });
  });

  // Com prefixos
  prefixes.forEach(prefix => {
    extensions.slice(0, 3).forEach(({ ext, price }) => {
      suggestions.push({
        domain: `${prefix}${cleanKeyword}${ext}`,
        extension: ext,
        price,
        category: 'prefix',
        score: 85
      });
    });
  });

  // Com sufixos
  suffixes.forEach(suffix => {
    extensions.slice(0, 3).forEach(({ ext, price }) => {
      suggestions.push({
        domain: `${cleanKeyword}${suffix}${ext}`,
        extension: ext,
        price,
        category: 'suffix',
        score: 80
      });
    });
  });

  // Variações criativas
  const variations = [
    `${cleanKeyword}s`,
    `${cleanKeyword}hq`,
    `${cleanKeyword}pro`,
    `${cleanKeyword}plus`,
    `${cleanKeyword}x`,
    `${cleanKeyword}24`,
    `${cleanKeyword}360`
  ];

  variations.forEach(variation => {
    extensions.slice(0, 2).forEach(({ ext, price }) => {
      suggestions.push({
        domain: `${variation}${ext}`,
        extension: ext,
        price,
        category: 'variation',
        score: 75
      });
    });
  });

  // Limita o número de sugestões
  return suggestions.slice(0, limit);
}
