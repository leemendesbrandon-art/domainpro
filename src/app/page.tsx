"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Check, Globe, Shield, Zap, TrendingUp, ChevronRight, Star, User, Lock, Eye, EyeOff, Settings, Activity, BarChart3 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [searchResult, setSearchResult] = useState<{
    available: boolean;
    domain: string;
    price: string;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const extensions = [
    { ext: ".com", price: "R$ 49,99", popular: true },
    { ext: ".br", price: "R$ 39,99", popular: true },
    { ext: ".com.br", price: "R$ 39,99", popular: true },
    { ext: ".net", price: "R$ 54,99", popular: false },
    { ext: ".org", price: "R$ 54,99", popular: false },
    { ext: ".store", price: "R$ 29,99", popular: false },
    { ext: ".tech", price: "R$ 34,99", popular: false },
    { ext: ".online", price: "R$ 24,99", popular: false },
  ];

  const features = [
    {
      icon: Shield,
      title: "Proteção de Privacidade Aprimorada",
      description: "Criptografia ponta a ponta, ocultação automática de WHOIS e autenticação em dois fatores. Ative ou ajuste as opções de segurança com apenas um clique.",
      details: [
        "Criptografia ponta a ponta",
        "Ocultação automática de informações públicas (WHOIS)",
        "Autenticação em dois fatores",
        "Controle total sobre privacidade"
      ]
    },
    {
      icon: Settings,
      title: "Configuração Instantânea",
      description: "Registre, ajuste e ative serviços sem etapas complexas. O sistema detecta automaticamente as melhores configurações e aplica otimizações em tempo real.",
      details: [
        "Detecção automática de configurações",
        "Otimizações em tempo real",
        "Sem etapas complexas",
        "Praticidade e agilidade"
      ]
    },
    {
      icon: Globe,
      title: "DNS Gerenciado Inteligente",
      description: "Tecnologia em nuvem com atualização automática. Alterações de DNS em segundos, monitoramento ativo e proteção contra ataques DDoS.",
      details: [
        "Alterações de DNS em segundos",
        "Monitoramento ativo de desempenho",
        "Proteção contra ataques DDoS",
        "Uptime de 99.9% garantido"
      ]
    },
    {
      icon: BarChart3,
      title: "Ferramentas de Marketing Integradas",
      description: "Painel de marketing inteligente com monitoramento de tráfego em tempo real, integração com redes sociais e campanhas personalizadas ativadas com um clique.",
      details: [
        "Monitoramento de tráfego e conversão",
        "Integração com redes sociais",
        "Geração automática de relatórios",
        "Campanhas personalizadas"
      ]
    },
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$ 39,99",
      period: "/ano",
      features: [
        "1 Domínio incluído",
        "Proteção de privacidade",
        "DNS gerenciado",
        "Suporte 24/7",
        "Certificado SSL grátis",
      ],
      highlighted: false,
    },
    {
      name: "Profissional",
      price: "R$ 89,99",
      period: "/ano",
      features: [
        "3 Domínios incluídos",
        "Proteção de privacidade premium",
        "DNS gerenciado avançado",
        "Suporte prioritário 24/7",
        "Certificado SSL grátis",
        "Email profissional (5 contas)",
        "Backup automático",
      ],
      highlighted: true,
    },
    {
      name: "Empresarial",
      price: "R$ 149,99",
      period: "/ano",
      features: [
        "10 Domínios incluídos",
        "Proteção de privacidade premium",
        "DNS gerenciado enterprise",
        "Suporte dedicado 24/7",
        "Certificado SSL grátis",
        "Email profissional (ilimitado)",
        "Backup automático",
        "Gerente de conta dedicado",
      ],
      highlighted: false,
    },
  ];

  const handleSearch = () => {
    if (!domain.trim()) return;

    setIsSearching(true);
    
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3;
      const cleanDomain = domain.toLowerCase().replace(/\s+/g, "");
      const finalDomain = cleanDomain.includes(".") ? cleanDomain : `${cleanDomain}.com`;
      
      setSearchResult({
        available: isAvailable,
        domain: finalDomain,
        price: "R$ 49,99",
      });
      setIsSearching(false);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", loginForm, "Lembrar:", rememberMe);
    alert("Login realizado com sucesso!");
    setShowLoginModal(false);
    setLoginForm({ email: "", password: "" });
    setShowPassword(false);
    setRememberMe(false);
  };

  const handleRegister = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-[#00a82d]" />
              <span className="text-2xl font-bold text-gray-900">DomainPro</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#dominios" className="text-gray-700 hover:text-[#00a82d] transition-colors">
                Domínios
              </a>
              <a href="#recursos" className="text-gray-700 hover:text-[#00a82d] transition-colors">
                Recursos
              </a>
              <a href="#precos" className="text-gray-700 hover:text-[#00a82d] transition-colors">
                Preços
              </a>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-medium flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Acessar Conta
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setShowPassword(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00a82d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#00a82d]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
              <p className="text-gray-600">Acesse sua conta DomainPro</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#00a82d] rounded border-gray-300 focus:ring-[#00a82d]" 
                  />
                  <span className="text-sm text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-[#00a82d] hover:text-[#008c26] font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold text-lg"
              >
                Entrar
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <a href="#" className="text-[#00a82d] hover:text-[#008c26] font-medium">
                    Criar conta grátis
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Encontre o Domínio Perfeito
              <span className="block text-[#00a82d] mt-2">Para Seu Negócio</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10">
              Milhões de domínios disponíveis. Registre o seu hoje e comece a construir sua presença online.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Digite o domínio que você procura..."
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none text-lg"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? "Buscando..." : "Buscar"}
                </button>
              </div>
            </div>

            {/* Search Result */}
            {searchResult && (
              <div className="mt-6 bg-white rounded-2xl p-6 shadow-xl max-w-3xl mx-auto">
                {searchResult.available ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-bold text-xl">{searchResult.domain}</p>
                        <p className="text-green-600 font-medium">Disponível!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900">{searchResult.price}</p>
                        <p className="text-sm text-gray-500">por ano</p>
                      </div>
                      <button 
                        onClick={handleRegister}
                        className="px-6 py-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold whitespace-nowrap"
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-2xl">✕</span>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-bold text-xl">{searchResult.domain}</p>
                        <p className="text-red-600 font-medium">Não disponível</p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold">
                      Ver Alternativas
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Popular Extensions */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {extensions.slice(0, 4).map((ext) => (
                <div
                  key={ext.ext}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
                >
                  <span className="text-white font-semibold">{ext.ext}</span>
                  <span className="text-gray-300 ml-2">{ext.price}/ano</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extensions Section */}
      <section id="dominios" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Extensões de Domínio Populares
            </h2>
            <p className="text-lg text-gray-600">
              Escolha a extensão perfeita para seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {extensions.map((ext) => (
              <div
                key={ext.ext}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#00a82d] relative"
              >
                {ext.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-[#00a82d] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{ext.ext}</h3>
                  <p className="text-2xl font-bold text-[#00a82d] mb-4">{ext.price}</p>
                  <p className="text-sm text-gray-500 mb-4">por ano</p>
                  <button 
                    onClick={handleRegister}
                    className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold"
                  >
                    Registrar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por Que Escolher a DomainPro?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Um painel inteligente e moderno onde cada função pode ser ativada de forma instantânea, de acordo com suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#00a82d]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-[#00a82d]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-4 pl-[72px]">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#00a82d] flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Ativação sob Demanda */}
          <div className="bg-gradient-to-r from-[#00a82d] to-[#008c26] rounded-2xl p-8 sm:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ativação sob Demanda</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Todas as funções do DomainPro — segurança, DNS, marketing e configurações — podem ser ativadas ou desativadas livremente pelo cliente, sempre que desejar. A proposta é simples: dar poder e flexibilidade total ao usuário, com o máximo de segurança, praticidade e desempenho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Planos Para Todos os Tamanhos
            </h2>
            <p className="text-lg text-gray-600">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg ${
                  plan.highlighted
                    ? "border-4 border-[#00a82d] scale-105 relative"
                    : "border-2 border-gray-200"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-[#00a82d] text-white px-4 py-1 rounded-full text-sm font-bold">
                      Mais Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00a82d] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleRegister}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-[#00a82d] text-white hover:bg-[#008c26]"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#00a82d] to-[#008c26]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto Para Começar Sua Jornada Online?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Registre seu domínio hoje e ganhe 3 meses de email profissional grátis!
          </p>
          <button 
            onClick={handleRegister}
            className="px-8 py-4 bg-white text-[#00a82d] rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg inline-flex items-center gap-2"
          >
            Buscar Meu Domínio
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-[#00a82d]" />
                <span className="text-xl font-bold">DomainPro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sua parceira confiável para registro de domínios e soluções web.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Domínios</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Hospedagem</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Email Profissional</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">SSL Certificados</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Status do Sistema</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Documentação</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-[#00a82d] transition-colors">Parceiros</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 DomainPro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#00a82d] transition-colors">Privacidade</a>
              <a href="#" className="hover:text-[#00a82d] transition-colors">Termos</a>
              <a href="#" className="hover:text-[#00a82d] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
