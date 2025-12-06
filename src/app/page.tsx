"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Check, Globe, Shield, Zap, TrendingUp, ChevronRight, Star, User, Lock, Eye, EyeOff, Settings, Activity, BarChart3, MessageCircle, X, Send, Bot, AlertCircle, CheckCircle, Wrench, RefreshCw, HelpCircle, FileText, Mic, Terminal, CreditCard, Bell, DollarSign, LogOut, History, TrendingDown, Download, Mail, Smartphone, Building2, Key } from "lucide-react";

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
  
  // Payment Settings States - Sistema Bancário Completo (5 Telas)
  const [showPaymentSettings, setShowPaymentSettings] = useState(false);
  const [bankingScreen, setBankingScreen] = useState<'login' | 'config' | 'verification' | 'dashboard' | 'history' | 'emailCode' | 'changePassword' | 'createPassword'>('login');
  const [masterPassword, setMasterPassword] = useState(""); // Senha será criada pelo usuário
  const [isPasswordCreated, setIsPasswordCreated] = useState(false);
  const [createPasswordForm, setCreatePasswordForm] = useState({ password: "", confirmPassword: "" });
  const [loginPasswordForm, setLoginPasswordForm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  
  // Email Code Authentication
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeExpiry, setCodeExpiry] = useState<Date | null>(null);
  const [showEmailCodeOption, setShowEmailCodeOption] = useState(false);
  
  // Change Password - NOVO FLUXO DIRETO
  const [changePasswordForm, setChangePasswordForm] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmNewPassword: "" 
  });
  
  // Banking Info
  const [bankingInfo, setBankingInfo] = useState({
    fullName: "",
    cpfCnpj: "",
    bank: "Nubank",
    accountType: "Corrente",
    agency: "0001",
    accountNumber: "",
    pixKey: ""
  });
  const [isBankConnected, setIsBankConnected] = useState(false);
  
  // Verification - AGORA COM SALDO VISÍVEL E OPÇÕES ATIVADAS
  const [microDepositValue, setMicroDepositValue] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [verificationStep, setVerificationStep] = useState<'microdeposit' | 'sms'>('microdeposit');
  const [isVerified, setIsVerified] = useState(false);
  const [pendingBalance, setPendingBalance] = useState(15847.50); // Saldo que será liberado após verificação
  
  // Dashboard
  const [balance, setBalance] = useState(15847.50);
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);
  
  // History
  const [transactions, setTransactions] = useState([
    { id: "TXN001", value: 2500.00, date: "2024-01-15 14:30", status: "success" as const },
    { id: "TXN002", value: 1800.00, date: "2024-01-10 09:15", status: "success" as const },
    { id: "TXN003", value: 3200.00, date: "2024-01-05 16:45", status: "pending" as const },
    { id: "TXN004", value: 950.00, date: "2024-01-01 11:20", status: "failed" as const },
    { id: "TXN005", value: 4500.00, date: "2023-12-28 13:00", status: "success" as const },
  ]);
  
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    message: string;
    timestamp: Date;
    read: boolean;
  }>>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // ChatBot States
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    type: 'user' | 'bot';
    message: string;
    timestamp: Date;
    actions?: Array<{ label: string; action: string }>;
  }>>([
    {
      type: 'bot',
      message: 'Olá! Sou o assistente inteligente do DomainPro. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
      actions: [
        { label: '🔧 Diagnosticar Problema', action: 'diagnose' },
        { label: '❓ Perguntas Frequentes', action: 'faq' },
        { label: '⚙️ Configuração Guiada', action: 'setup' }
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Domain Registration State
  const [registeredDomain, setRegisteredDomain] = useState<{
    domain: string;
    plan: string;
    renewal: string;
    registeredAt: Date;
  } | null>(null);

  // Load password status from localStorage
  useEffect(() => {
    const savedPassword = localStorage.getItem('brendon_master_password');
    if (savedPassword) {
      setMasterPassword(savedPassword);
      setIsPasswordCreated(true);
    }
  }, []);

  // Block Timer Effect
  useEffect(() => {
    if (isBlocked && blockTimer > 0) {
      const timer = setTimeout(() => {
        setBlockTimer(blockTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isBlocked && blockTimer === 0) {
      setIsBlocked(false);
      setLoginAttempts(0);
    }
  }, [isBlocked, blockTimer]);

  // Code Expiry Check
  useEffect(() => {
    if (codeExpiry) {
      const checkExpiry = setInterval(() => {
        if (new Date() > codeExpiry) {
          setGeneratedCode("");
          setCodeExpiry(null);
          setPasswordError("Código expirado. Solicite um novo código.");
        }
      }, 1000);
      return () => clearInterval(checkExpiry);
    }
  }, [codeExpiry]);

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
    // Registrar domínio blmmybox.com com plano padrão e renovação anual
    const newRegistration = {
      domain: "blmmybox.com",
      plan: "Profissional",
      renewal: "Anual",
      registeredAt: new Date()
    };
    
    setRegisteredDomain(newRegistration);
    
    // Notificação de sucesso
    const notification = {
      id: Date.now(),
      message: `✅ Domínio blmmybox.com registrado com sucesso! Plano: Profissional | Renovação: Anual`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
    
    alert("✅ Domínio blmmybox.com registrado com sucesso!\n\nPlano: Profissional (R$ 89,99/ano)\nRenovação: Anual\n\nVocê receberá um email de confirmação em instantes.");
  };

  // Banking Functions

  const handleOpenPaymentSettings = () => {
    setShowPaymentSettings(true);
    if (!isPasswordCreated) {
      setBankingScreen('createPassword'); // Vai mostrar tela de criar senha
    } else {
      setBankingScreen('login'); // Vai mostrar tela de inserir senha
      setShowEmailCodeOption(true); // Mostrar opção de código por email
    }
    setPasswordError("");
  };

  const generateEmailCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5); // Expira em 5 minutos
    setCodeExpiry(expiry);
    
    // Simular envio de email
    const emailNotif = {
      id: Date.now(),
      message: `📧 Código de acesso enviado para leemendesbrandon@gmail.com: ${code} (válido por 5 minutos)`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [emailNotif, ...prev]);
    
    alert(`📧 Código enviado para leemendesbrandon@gmail.com\n\nCódigo: ${code}\n\nO código expira em 5 minutos.`);
  };

  // NOVO FLUXO: Alterar Senha Diretamente
  const handleChangePasswordDirect = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    // Validar senha atual
    const enteredCurrentPassword = btoa(changePasswordForm.currentPassword);
    if (enteredCurrentPassword !== masterPassword) {
      setPasswordError("Senha atual incorreta.");
      return;
    }

    // Validar nova senha
    if (changePasswordForm.newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    // Atualizar senha imediatamente
    const encryptedPassword = btoa(changePasswordForm.newPassword);
    localStorage.setItem('brendon_master_password', encryptedPassword);
    setMasterPassword(encryptedPassword);
    
    // Notificação
    const notif = {
      id: Date.now(),
      message: "✅ Senha alterada com sucesso! A nova senha foi criptografada e salva automaticamente.",
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
    
    alert("✅ Senha alterada e salva com sucesso!\n\nSua nova senha foi criptografada e está pronta para uso nos próximos acessos.");
    setBankingScreen('login');
    setChangePasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  const handleLoginWithEmailCode = () => {
    generateEmailCode();
    setBankingScreen('emailCode');
  };

  const handleVerifyEmailCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codeExpiry || new Date() > codeExpiry) {
      setPasswordError("Código expirado. Solicite um novo código.");
      return;
    }
    
    if (emailCode === generatedCode) {
      setLoginAttempts(0);
      setBankingScreen('config');
      setEmailCode("");
      setGeneratedCode("");
      setCodeExpiry(null);
      setPasswordError("");
    } else {
      setPasswordError("Código incorreto. Verifique o código enviado para seu email.");
    }
  };

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (createPasswordForm.password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (createPasswordForm.password !== createPasswordForm.confirmPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    // Salvar senha (criptografada em produção)
    const encryptedPassword = btoa(createPasswordForm.password); // Simulação de criptografia
    localStorage.setItem('brendon_master_password', encryptedPassword);
    setMasterPassword(encryptedPassword);
    setIsPasswordCreated(true);
    setCreatePasswordForm({ password: "", confirmPassword: "" });
    
    alert("✅ Senha criada com sucesso! Agora você pode acessar a área de pagamentos.");
    setBankingScreen('login');
  };

  const handleBankingLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (isBlocked) {
      setPasswordError(`Sistema bloqueado. Aguarde ${Math.floor(blockTimer / 60)}:${(blockTimer % 60).toString().padStart(2, '0')}`);
      return;
    }

    const enteredPassword = btoa(loginPasswordForm);
    if (enteredPassword === masterPassword) {
      setLoginAttempts(0);
      setBankingScreen('config');
      setLoginPasswordForm("");
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsBlocked(true);
        setBlockTimer(300); // 5 minutos
        setPasswordError("Muitas tentativas incorretas. Sistema bloqueado por 5 minutos.");
        
        // Enviar notificação de segurança
        const securityNotif = {
          id: Date.now(),
          message: "🔒 Alerta de Segurança: 5 tentativas de acesso incorretas detectadas. Sistema bloqueado por 5 minutos.",
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [securityNotif, ...prev]);
      } else {
        setPasswordError(`Senha incorreta. Tentativa ${newAttempts}/5`);
      }
      setLoginPasswordForm("");
    }
  };

  const handleSaveBankingInfo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criptografar dados bancários (simulação)
    const encryptedData = {
      ...bankingInfo,
      cpfCnpj: btoa(bankingInfo.cpfCnpj),
      accountNumber: btoa(bankingInfo.accountNumber)
    };
    
    console.log("Dados bancários criptografados:", encryptedData);
    
    // Enviar notificação por email (simulado)
    const emailNotification = {
      id: Date.now(),
      message: "📧 Dados bancários salvos com sucesso. Email de confirmação enviado para seu endereço cadastrado.",
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [emailNotification, ...prev]);
    
    alert("✅ Informações bancárias salvas com sucesso e criptografadas!");
  };

  const handleConnectNubank = () => {
    setIsBankConnected(true);
    setBankingScreen('verification');
    
    // Simular envio de microdepósito
    alert("🏦 Conexão iniciada! Um microdepósito de R$ 0,01 foi enviado para sua conta Nubank. Verifique seu extrato.");
    
    // Notificação SMS
    setTimeout(() => {
      const smsNotif = {
        id: Date.now(),
        message: "📱 SMS enviado: Código de verificação será necessário após confirmar o microdepósito.",
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [smsNotif, ...prev]);
    }, 2000);
  };

  const handleVerifyMicroDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (microDepositValue === "0.01" || microDepositValue === "0,01") {
      setVerificationStep('sms');
      alert("✅ Valor correto! Agora vamos verificar por SMS.");
      
      // Simular envio de SMS
      setTimeout(() => {
        alert("📱 Código SMS enviado para seu celular cadastrado: *****-1234");
        const smsNotif = {
          id: Date.now(),
          message: "📱 Código de verificação SMS enviado. Digite o código de 6 dígitos.",
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [smsNotif, ...prev]);
      }, 1000);
    } else {
      alert("❌ Valor incorreto. Verifique o valor recebido em sua conta Nubank.");
    }
  };

  const handleVerifySMS = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (smsCode === "123456") {
      setIsVerified(true);
      setBankingScreen('dashboard');
      
      const notification = {
        id: Date.now(),
        message: `✅ Conta verificada com sucesso! Saldo de R$ ${pendingBalance.toFixed(2)} liberado e disponível para transferência.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
      
      // Email de confirmação
      setTimeout(() => {
        const emailNotif = {
          id: Date.now() + 1,
          message: "📧 Email de confirmação enviado: Sua conta foi verificada e está pronta para receber pagamentos.",
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [emailNotif, ...prev]);
      }, 2000);
      
      alert(`✅ Verificação concluída! Seu saldo de R$ ${pendingBalance.toFixed(2)} foi liberado e está pronto para transferência.`);
    } else {
      alert("❌ Código SMS incorreto. Tente novamente ou solicite um novo código.");
    }
  };

  const handleTransfer = () => {
    if (balance > 0) {
      const transferValue = balance;
      setBalance(0);
      setShowTransferSuccess(true);
      
      // Adicionar transação ao histórico
      const newTransaction = {
        id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
        value: transferValue,
        date: new Date().toLocaleString('pt-BR', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', ''),
        status: "success" as const
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Notificação de transferência
      const notification = {
        id: Date.now(),
        message: `💰 Transferência de R$ ${transferValue.toFixed(2)} realizada com sucesso para sua conta Nubank.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
      
      // Email notification (simulado)
      setTimeout(() => {
        const emailNotif = {
          id: Date.now() + 1,
          message: `📧 Email enviado: Comprovante de transferência de R$ ${transferValue.toFixed(2)} para conta Nubank (Ag: 0001).`,
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [emailNotif, ...prev]);
      }, 2000);
      
      setTimeout(() => {
        setShowTransferSuccess(false);
      }, 5000);
    }
  };

  const handleExportPDF = () => {
    alert("📄 Gerando PDF do histórico de transações...\n\nO arquivo será baixado em instantes.");
    
    // Simular geração de PDF
    setTimeout(() => {
      const pdfContent = `
===========================================
    HISTÓRICO DE TRANSAÇÕES
    BLM DomainBox - Brendon
===========================================

Total de transações: ${transactions.length}

${transactions.map(t => `
ID: ${t.id}
Valor: R$ ${t.value.toFixed(2)}
Data: ${t.date}
Status: ${t.status === 'success' ? 'Sucesso' : t.status === 'pending' ? 'Pendente' : 'Falha'}
-------------------------------------------
`).join('')}

Gerado em: ${new Date().toLocaleString('pt-BR')}
===========================================
      `;
      
      console.log("PDF Gerado:", pdfContent);
      alert("✅ PDF gerado com sucesso!\n\nHistorico_Transacoes_BLM_DomainBox.pdf");
      
      // Notificação
      const notif = {
        id: Date.now(),
        message: "📄 Histórico exportado em PDF com sucesso.",
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notif, ...prev]);
    }, 2000);
  };

  const handleCloseBanking = () => {
    setShowPaymentSettings(false);
    setBankingScreen('login');
    setLoginPasswordForm("");
    setPasswordError("");
    setEmailCode("");
    setGeneratedCode("");
    setCodeExpiry(null);
    setShowEmailCodeOption(false);
    setChangePasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // ChatBot Functions
  const handleChatAction = (action: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = "";
      let actions: Array<{ label: string; action: string }> = [];

      switch (action) {
        case 'diagnose':
          botResponse = "🔍 Iniciando diagnóstico automático...\n\n✅ DNS: Funcionando normalmente\n✅ Servidor: Online (99.9% uptime)\n✅ Certificado SSL: Válido\n✅ Pagamentos: Sistema operacional\n\nTudo está funcionando perfeitamente! Posso ajudar com algo específico?";
          actions = [
            { label: '🔧 Verificar Domínio', action: 'check_domain' },
            { label: '💳 Status de Pagamento', action: 'payment_status' },
            { label: '🌐 Testar DNS', action: 'test_dns' }
          ];
          break;
        case 'faq':
          botResponse = "📚 Perguntas Frequentes:\n\n1️⃣ Como recuperar minha senha?\n2️⃣ Por que meu domínio não está abrindo?\n3️⃣ Como ativar ferramentas de marketing?\n4️⃣ Meu pagamento não processou, e agora?\n5️⃣ Como configurar meu cartão?\n\nDigite o número da pergunta ou descreva seu problema.";
          break;
        case 'setup':
          botResponse = "⚙️ Assistente de Configuração Guiada\n\nVamos configurar seu sistema juntos! Escolha o que deseja configurar:";
          actions = [
            { label: '🌐 Configurar DNS', action: 'setup_dns' },
            { label: '📈 Ativar Marketing', action: 'setup_marketing' },
            { label: '🔒 Configurar Segurança', action: 'setup_security' }
          ];
          break;
        case 'check_domain':
          botResponse = "🌐 Verificando status do domínio...\n\n✅ Domínio: Ativo\n✅ Expiração: 15/12/2025\n✅ DNS: Configurado corretamente\n✅ SSL: Ativo e válido\n\nSeu domínio está funcionando perfeitamente!";
          break;
        case 'payment_status':
          botResponse = "💳 Status de Pagamentos:\n\n✅ Último pagamento: 15/01/2024 - Aprovado\n📅 Próximo vencimento: 15/01/2025\n💰 Valor: R$ 89,99/ano\n\nTodos os pagamentos estão em dia!";
          break;
        case 'test_dns':
          botResponse = "🌐 Testando configurações de DNS...\n\n✅ Servidor primário: Respondendo (12ms)\n✅ Servidor secundário: Respondendo (15ms)\n✅ Propagação: 100% completa\n✅ DNSSEC: Ativo\n\nSeu DNS está otimizado e funcionando perfeitamente!";
          break;
        case 'setup_dns':
          botResponse = "🌐 Configuração de DNS\n\nVou configurar seu DNS automaticamente com as melhores práticas:\n\n1. Aplicando configurações otimizadas...\n2. Ativando proteção DDoS...\n3. Configurando cache inteligente...\n\n✅ DNS configurado com sucesso!\n\nSuas alterações estarão ativas em até 5 minutos.";
          break;
        case 'setup_marketing':
          botResponse = "📈 Ferramentas de Marketing\n\nAtivando painel de marketing inteligente:\n\n✅ Monitoramento de tráfego: Ativo\n✅ Integração com redes sociais: Configurada\n✅ Relatórios automáticos: Ativados\n✅ Campanhas personalizadas: Prontas\n\nSuas ferramentas de marketing estão ativas!";
          break;
        case 'setup_security':
          botResponse = "🔒 Configuração de Segurança\n\nAplicando configurações de segurança avançadas:\n\n✅ Criptografia ponta a ponta: Ativa\n✅ Autenticação em dois fatores: Configurada\n✅ Proteção WHOIS: Ativa\n✅ Firewall: Ativo\n\nSua conta está totalmente protegida!";
          break;
        case 'human_support':
          botResponse = "👤 Encaminhando para Suporte Humano\n\n📋 Ticket #" + Math.floor(Math.random() * 10000) + " criado\n⏱️ Tempo estimado de resposta: 5-10 minutos\n\nUm de nossos especialistas entrará em contato em breve. Você receberá uma notificação quando o atendente estiver disponível.";
          break;
        default:
          botResponse = "Entendi! Como posso ajudá-lo com isso?";
      }

      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: botResponse,
        timestamp: new Date(),
        actions: actions.length > 0 ? actions : undefined
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let actions: Array<{ label: string; action: string }> = [];

      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('senha') || lowerMessage.includes('login')) {
        botResponse = "🔐 Problemas com senha?\n\nVocê pode recuperar sua senha facilmente:\n1. Clique em 'Esqueceu a senha?' na tela de login\n2. Insira seu email cadastrado\n3. Você receberá um código de verificação\n4. Defina uma nova senha segura\n\nPosso ajudar com mais alguma coisa?";
      } else if (lowerMessage.includes('dominio') || lowerMessage.includes('dns')) {
        botResponse = "🌐 Detectei uma consulta sobre domínio/DNS.\n\nQuer que eu execute um diagnóstico completo do seu domínio agora?";
        actions = [
          { label: '✅ Sim, diagnosticar', action: 'check_domain' },
          { label: '🔧 Reconfigurar DNS', action: 'setup_dns' }
        ];
      } else if (lowerMessage.includes('pagamento') || lowerMessage.includes('pix') || lowerMessage.includes('cartao')) {
        botResponse = "💳 Problemas com pagamento?\n\nPosso ajudar com:\n• Verificar status de pagamento\n• Regenerar QR Code do Pix\n• Atualizar dados do cartão\n• Consultar histórico de pagamentos\n\nO que você precisa?";
        actions = [
          { label: '📊 Ver Status', action: 'payment_status' },
          { label: '🔄 Regenerar Pix', action: 'regenerate_pix' }
        ];
      } else if (lowerMessage.includes('erro') || lowerMessage.includes('problema') || lowerMessage.includes('bug')) {
        botResponse = "⚠️ Detectei um problema!\n\nVou executar um diagnóstico automático para identificar e corrigir o erro.";
        actions = [
          { label: '🔍 Diagnosticar Agora', action: 'diagnose' },
          { label: '👤 Falar com Humano', action: 'human_support' }
        ];
      } else if (lowerMessage.includes('marketing') || lowerMessage.includes('campanha')) {
        botResponse = "📈 Ferramentas de Marketing\n\nPosso ajudá-lo a:\n• Ativar painel de marketing\n• Configurar campanhas\n• Integrar redes sociais\n• Gerar relatórios\n\nO que deseja fazer?";
        actions = [
          { label: '🚀 Ativar Marketing', action: 'setup_marketing' }
        ];
      } else {
        botResponse = "Entendi sua mensagem! Posso ajudá-lo de várias formas:";
        actions = [
          { label: '🔧 Diagnosticar Sistema', action: 'diagnose' },
          { label: '❓ Ver Perguntas Frequentes', action: 'faq' },
          { label: '👤 Falar com Humano', action: 'human_support' }
        ];
      }

      setChatMessages(prev => [...prev, {
        type: 'bot',
        message: botResponse,
        timestamp: new Date(),
        actions: actions.length > 0 ? actions : undefined
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const getStatusColor = (status: 'success' | 'pending' | 'failed') => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
    }
  };

  const getStatusText = (status: 'success' | 'pending' | 'failed') => {
    switch (status) {
      case 'success': return 'Sucesso';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falha';
    }
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
                onClick={() => setShowChatBot(true)}
                className="text-[#00a82d] hover:text-[#008c26] font-medium flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com Suporte
              </button>
              
              {/* Botão Receber Pagamentos - Apenas para Brendon */}
              <button 
                onClick={handleOpenPaymentSettings}
                className="text-gray-700 hover:text-[#00a82d] font-medium flex items-center gap-2 transition-colors"
                title="Área exclusiva do proprietário - Brendon"
              >
                <CreditCard className="w-5 h-5" />
                Receber Pagamentos
              </button>

              {/* Notificações */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-700 hover:text-[#00a82d] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

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

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#00a82d]" />
              Notificações
            </h3>
          </div>
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhuma notificação
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? 'bg-green-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notif.timestamp.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-[#00a82d] rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Banking System Modal - Sistema Completo com Autenticação por Email */}
      {showPaymentSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative my-8">
            
            {/* Tela: Criar Senha (primeira vez) */}
            {bankingScreen === 'createPassword' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Criar Senha de Acesso</h2>
                  <p className="text-gray-600">Configure sua senha para proteger a área de pagamentos</p>
                  <p className="text-sm text-purple-600 font-semibold mt-2">Acesso exclusivo - Brendon (BLM DomainBox)</p>
                </div>

                <form onSubmit={handleCreatePassword} className="space-y-6">
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Digite a nova senha
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      value={createPasswordForm.password}
                      onChange={(e) => setCreatePasswordForm({ ...createPasswordForm, password: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirme a senha
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      value={createPasswordForm.confirmPassword}
                      onChange={(e) => setCreatePasswordForm({ ...createPasswordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Digite a senha novamente"
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
                  >
                    Criar Senha
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    <p>🔒 Sua senha será criptografada e armazenada com segurança</p>
                  </div>
                </form>
              </>
            )}
            
            {/* Tela 1: Login Bancário */}
            {isPasswordCreated && bankingScreen === 'login' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Login Bancário</h2>
                  <p className="text-gray-600">Digite sua senha para acessar</p>
                  <p className="text-sm text-blue-600 font-semibold mt-2">Brendon - BLM DomainBox</p>
                </div>

                <form onSubmit={handleBankingLogin} className="space-y-6">
                  <div>
                    <label htmlFor="banking-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Digite sua senha
                    </label>
                    <input
                      type="password"
                      id="banking-password"
                      value={loginPasswordForm}
                      onChange={(e) => setLoginPasswordForm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                      required
                      disabled={isBlocked}
                    />
                  </div>

                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isBlocked}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBlocked ? `Bloqueado (${Math.floor(blockTimer / 60)}:${(blockTimer % 60).toString().padStart(2, '0')})` : 'Entrar'}
                  </button>

                  {/* Opção de entrar com código por email */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLoginWithEmailCode}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Entrar com Código por Email
                  </button>

                  {/* Link para criar senha */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setBankingScreen('createPassword')}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Criar Nova Senha
                    </button>
                  </div>

                  {/* Link para alterar senha */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setBankingScreen('changePassword')}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Alterar Senha
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>🔒 Sistema protegido com bloqueio automático após 5 tentativas</p>
                  </div>
                </form>
              </>
            )}

            {/* Tela: Login com Código por Email */}
            {bankingScreen === 'emailCode' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Código de Acesso</h2>
                  <p className="text-gray-600">Digite o código enviado para seu email</p>
                  <p className="text-sm text-purple-600 font-semibold mt-2">leemendesbrandon@gmail.com</p>
                </div>

                <form onSubmit={handleVerifyEmailCode} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código de 6 dígitos
                    </label>
                    <input
                      type="text"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}

                  {codeExpiry && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700 text-center">
                        ⏱️ Código expira em: {Math.max(0, Math.floor((codeExpiry.getTime() - new Date().getTime()) / 1000))}s
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Verificar Código
                  </button>

                  <button
                    type="button"
                    onClick={() => setBankingScreen('login')}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Voltar
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    <p>🔒 Código criptografado e temporário (expira em 5 minutos)</p>
                  </div>
                </form>
              </>
            )}

            {/* Tela: Alterar Senha - NOVO FLUXO DIRETO */}
            {bankingScreen === 'changePassword' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Alterar Senha</h2>
                  <p className="text-gray-600">Digite sua senha atual e escolha uma nova senha</p>
                  <p className="text-sm text-orange-600 font-semibold mt-2">Brendon - BLM DomainBox</p>
                </div>

                <form onSubmit={handleChangePasswordDirect} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Senha atual
                    </label>
                    <input
                      type="password"
                      value={changePasswordForm.currentPassword}
                      onChange={(e) => setChangePasswordForm({ ...changePasswordForm, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="Digite sua senha atual"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nova senha
                    </label>
                    <input
                      type="password"
                      value={changePasswordForm.newPassword}
                      onChange={(e) => setChangePasswordForm({ ...changePasswordForm, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="Mínimo 6 caracteres"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirme a nova senha
                    </label>
                    <input
                      type="password"
                      value={changePasswordForm.confirmNewPassword}
                      onChange={(e) => setChangePasswordForm({ ...changePasswordForm, confirmNewPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="Digite a senha novamente"
                      required
                    />
                  </div>

                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{passwordError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    Alterar Senha
                  </button>

                  <button
                    type="button"
                    onClick={() => setBankingScreen('login')}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      A senha será atualizada imediatamente se a senha atual estiver correta
                    </p>
                  </div>
                </form>
              </>
            )}

            {/* Tela 2: Configurações Bancárias */}
            {bankingScreen === 'config' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Configurações Bancárias</h2>
                  <p className="text-gray-600">Configure seus dados para receber pagamentos com segurança</p>
                </div>

                <form onSubmit={handleSaveBankingInfo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                    <input
                      type="text"
                      value={bankingInfo.fullName}
                      onChange={(e) => setBankingInfo({ ...bankingInfo, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CPF/CNPJ</label>
                      <input
                        type="text"
                        value={bankingInfo.cpfCnpj}
                        onChange={(e) => setBankingInfo({ ...bankingInfo, cpfCnpj: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                      <input
                        type="text"
                        value={bankingInfo.bank}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-purple-50 font-semibold text-purple-700"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de conta</label>
                      <input
                        type="text"
                        value={bankingInfo.accountType}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Agência</label>
                      <input
                        type="text"
                        value={bankingInfo.agency}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número da conta</label>
                    <input
                      type="text"
                      value={bankingInfo.accountNumber}
                      onChange={(e) => setBankingInfo({ ...bankingInfo, accountNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="0000000-0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chave Pix (opcional)</label>
                    <input
                      type="text"
                      value={bankingInfo.pixKey}
                      onChange={(e) => setBankingInfo({ ...bankingInfo, pixKey: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      placeholder="email@exemplo.com, CPF ou telefone"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Todos os dados são criptografados e armazenados com segurança
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Salvar
                    </button>

                    <button
                      type="button"
                      onClick={handleConnectNubank}
                      className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <Building2 className="w-5 h-5" />
                      Conectar ao Nubank
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Tela 3: Verificação - AGORA COM SALDO VISÍVEL E OPÇÕES ATIVADAS */}
            {bankingScreen === 'verification' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Verificação de Segurança</h2>
                  <p className="text-gray-600">Confirme sua identidade para ativar transferências automáticas</p>
                  
                  {/* SALDO PENDENTE VISÍVEL */}
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                    <p className="text-sm text-green-700 font-medium mb-2">💰 Saldo Pendente de Liberação</p>
                    <p className="text-4xl font-bold text-green-600">
                      R$ {pendingBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      ✅ Será liberado após verificação completa
                    </p>
                  </div>
                </div>

                {verificationStep === 'microdeposit' ? (
                  <form onSubmit={handleVerifyMicroDeposit} className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Microdepósito
                      </h3>
                      <p className="text-sm text-blue-700">
                        Enviamos um pequeno valor (R$ 0,01) para sua conta Nubank. Verifique seu extrato e digite o valor recebido para confirmar.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Digite o valor recebido (R$)
                      </label>
                      <input
                        type="text"
                        value={microDepositValue}
                        onChange={(e) => setMicroDepositValue(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-center text-2xl"
                        placeholder="0,01"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold"
                    >
                      Verificar Valor
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifySMS} className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <Smartphone className="w-5 h-5" />
                        Código SMS
                      </h3>
                      <p className="text-sm text-green-700">
                        Enviamos um código de 6 dígitos para seu celular cadastrado. Digite o código para concluir a verificação.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Digite o código de verificação
                      </label>
                      <input
                        type="text"
                        value={smsCode}
                        onChange={(e) => setSmsCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-center text-2xl tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Confirmar Código
                    </button>
                  </form>
                )}
              </>
            )}

            {/* Tela 4: Painel de Saldo */}
            {bankingScreen === 'dashboard' && (
              <>
                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Seus Lucros</h2>
                  <p className="text-gray-600">Painel de controle financeiro - BLM DomainBox</p>
                </div>

                {/* Saldo Total */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-6 border-2 border-green-200">
                  <p className="text-sm text-green-700 font-medium mb-2">Saldo Total Disponível</p>
                  <p className="text-5xl font-bold text-green-600 mb-4">
                    R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Conta verificada • Transferências automáticas ativas</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={handleTransfer}
                    disabled={balance === 0}
                    className="px-6 py-4 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    Transferir
                  </button>

                  <button
                    onClick={() => setBankingScreen('history')}
                    className="px-6 py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <History className="w-5 h-5" />
                    Histórico
                  </button>
                </div>

                {/* Mensagem de Sucesso */}
                {showTransferSuccess && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-semibold">
                      Saque bem-sucedido! Seu pagamento foi transferido com sucesso para sua conta Nubank.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Tela 5: Histórico */}
            {bankingScreen === 'history' && (
              <>
                <button
                  onClick={() => setBankingScreen('dashboard')}
                  className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
                >
                  ← Voltar
                </button>

                <button
                  onClick={handleCloseBanking}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 mt-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Depósitos</h2>
                  <p className="text-gray-600">Todas as suas transações registradas</p>
                </div>

                {/* Lista de Transações */}
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">ID da transação: {transaction.id}</p>
                    </div>
                  ))}
                </div>

                {/* Botão Exportar PDF */}
                <button
                  onClick={handleExportPDF}
                  className="w-full px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Exportar PDF
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ChatBot Modal */}
      {showChatBot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl h-[90vh] sm:h-[600px] flex flex-col">
            {/* ChatBot Header */}
            <div className="bg-gradient-to-r from-[#00a82d] to-[#008c26] p-6 rounded-t-3xl sm:rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Assistente DomainPro</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Resposta instantânea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChatBot(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ChatBot Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-[#00a82d] text-white' : 'bg-white text-gray-900 border border-gray-200'} rounded-2xl p-4 shadow-sm`}>
                    <p className="whitespace-pre-line text-sm leading-relaxed">{msg.message}</p>
                    {msg.actions && (
                      <div className="mt-3 space-y-2">
                        {msg.actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleChatAction(action.action)}
                            className="w-full px-4 py-2 bg-[#00a82d]/10 hover:bg-[#00a82d]/20 text-[#00a82d] rounded-lg transition-colors text-sm font-medium text-left"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs opacity-60 mt-2">
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ChatBot Input */}
            <div className="p-4 bg-white border-t border-gray-200 rounded-b-3xl sm:rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-medium"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleChatAction('diagnose')}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  🔧 Diagnóstico
                </button>
                <button
                  onClick={() => handleChatAction('faq')}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  ❓ FAQ
                </button>
                <button
                  onClick={() => handleChatAction('human_support')}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                >
                  👤 Atendente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <a href="/recuperar-senha" className="text-sm text-[#00a82d] hover:text-[#008c26] font-medium">
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

      {/* Floating Support Button */}
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#00a82d] text-white rounded-full shadow-2xl hover:bg-[#008c26] transition-all hover:scale-110 flex items-center justify-center z-40"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
}
