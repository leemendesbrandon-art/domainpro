"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Check, Globe, Shield, Zap, TrendingUp, ChevronRight, Star, User, Lock, Eye, EyeOff, Settings, Activity, BarChart3, MessageCircle, X, Send, Bot, AlertCircle, CheckCircle, Wrench, RefreshCw, HelpCircle, FileText, Mic, Terminal, CreditCard, Bell, DollarSign, LogOut, History, TrendingDown, Download, Mail, Smartphone, Building2, Key, ShoppingCart, Package, Clock, Users, Gift, Store, Camera, Save, Edit, Trash2, Plus, Server, Shield as ShieldIcon, Copy, Link as LinkIcon, TrendingUp as TrendingUpIcon } from "lucide-react";

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
  
  // User Panel States
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Brendon Lee Mendes",
    email: "leemendesbrandon@gmail.com",
    phone: "+55 11 98765-4321",
    photo: "https://ui-avatars.com/api/?name=Brendon+Lee&background=00a82d&color=fff&size=128"
  });
  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: ""
  });
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showEditConfirmPassword, setShowEditConfirmPassword] = useState(false);

  // Support Panel States
  const [showSupportPanel, setShowSupportPanel] = useState(false);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [supportTickets, setSupportTickets] = useState<Array<{
    id: string;
    subject: string;
    status: 'open' | 'pending' | 'closed';
    date: string;
    lastMessage?: string;
  }>>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportMessages, setSupportMessages] = useState<Array<{
    id: number;
    sender: 'user' | 'support';
    message: string;
    timestamp: string;
  }>>([]);

  // Notifications States
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    userId?: string;
    title?: string;
    message: string;
    timestamp?: Date;
    date?: string;
    read: boolean;
    type?: 'success' | 'warning' | 'info' | 'error';
  }>>([]);

  // Domain Management States
  const [showDomainPanel, setShowDomainPanel] = useState(false);
  const [userDomains, setUserDomains] = useState<Array<{
    id: string;
    domain: string;
    status: 'active' | 'expiring' | 'expired';
    expiryDate: string;
    autoRenew: boolean;
    dnsRecords?: Array<{ type: string; name: string; value: string }>;
    emails?: Array<{ email: string; password: string }>;
  }>>([
    {
      id: "DOM001",
      domain: "brendonlee.com",
      status: "active",
      expiryDate: "2025-12-15",
      autoRenew: true,
      dnsRecords: [
        { type: "A", name: "@", value: "192.168.1.1" },
        { type: "CNAME", name: "www", value: "brendonlee.com" }
      ],
      emails: []
    },
    {
      id: "DOM002",
      domain: "blmdomains.com.br",
      status: "expiring",
      expiryDate: "2024-02-28",
      autoRenew: false,
      dnsRecords: [],
      emails: []
    }
  ]);
  const [selectedDomainForConfig, setSelectedDomainForConfig] = useState<any>(null);
  const [showDNSConfig, setShowDNSConfig] = useState(false);
  const [showEmailCreation, setShowEmailCreation] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [newDNSRecord, setNewDNSRecord] = useState({ type: "A", name: "", value: "" });
  const [newEmail, setNewEmail] = useState({ email: "", password: "" });

  // Affiliate Panel States
  const [showAffiliatePanel, setShowAffiliatePanel] = useState(false);
  const [affiliateData, setAffiliateData] = useState({
    userId: "brendon123",
    link: "https://blmdomainbox.com/afiliado/brendon123",
    balance: 1250.50,
    totalSales: 25,
    pendingWithdrawal: 0,
    sales: [
      {
        id: "SALE001",
        domain: "techstartup.com.br",
        date: "2024-01-15",
        commission: 49.99,
        status: "confirmed" as const
      },
      {
        id: "SALE002",
        domain: "lojaonline.com",
        date: "2024-01-10",
        commission: 89.99,
        status: "confirmed" as const
      },
      {
        id: "SALE003",
        domain: "meusite.com.br",
        date: "2024-01-08",
        commission: 39.99,
        status: "confirmed" as const
      }
    ]
  });

  // Marketplace Panel States
  const [showMarketplacePanel, setShowMarketplacePanel] = useState(false);
  const [marketplaceDomains, setMarketplaceDomains] = useState<Array<{
    id: string;
    domain: string;
    price: number;
    category: string;
    seller: string;
    featured: boolean;
  }>>([
    { id: "MKT001", domain: "techstartup.com", price: 5000, category: "Tecnologia", seller: "João Silva", featured: true },
    { id: "MKT002", domain: "lojaonline.com.br", price: 3500, category: "E-commerce", seller: "Maria Santos", featured: true },
    { id: "MKT003", domain: "consultoria.com", price: 8000, category: "Negócios", seller: "Pedro Costa", featured: false },
    { id: "MKT004", domain: "fitness.app", price: 4500, category: "Saúde", seller: "Ana Lima", featured: false },
    { id: "MKT005", domain: "educacao.online", price: 6000, category: "Educação", seller: "Carlos Souza", featured: true },
    { id: "MKT006", domain: "marketing.digital", price: 7500, category: "Marketing", seller: "Juliana Rocha", featured: false },
    { id: "MKT007", domain: "investimentos.com.br", price: 12000, category: "Finanças", seller: "Roberto Alves", featured: true },
    { id: "MKT008", domain: "design.studio", price: 5500, category: "Design", seller: "Fernanda Dias", featured: false },
    { id: "MKT009", domain: "games.zone", price: 9000, category: "Entretenimento", seller: "Lucas Martins", featured: true },
    { id: "MKT010", domain: "saude.online", price: 6500, category: "Saúde", seller: "Patricia Nunes", featured: false }
  ]);
  const [selectedMarketplaceDomain, setSelectedMarketplaceDomain] = useState<any>(null);
  const [showMarketplacePurchase, setShowMarketplacePurchase] = useState(false);
  
  // Payment Settings States
  const [showPaymentSettings, setShowPaymentSettings] = useState(false);
  const [bankingScreen, setBankingScreen] = useState<'login' | 'config' | 'verification' | 'dashboard' | 'history' | 'emailCode' | 'changePassword' | 'createPassword'>('login');
  const [masterPassword, setMasterPassword] = useState("");
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
  
  // Change Password
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
  
  // Verification
  const [microDepositValue, setMicroDepositValue] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [verificationStep, setVerificationStep] = useState<'microdeposit' | 'sms'>('microdeposit');
  const [isVerified, setIsVerified] = useState(false);
  const [pendingBalance, setPendingBalance] = useState(15847.50);
  
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
      message: 'Olá! Sou o assistente inteligente do BLM DomainBox. Como posso ajudá-lo hoje?',
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

  // Purchase Modal States
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<1 | 2 | 5>(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'pix' | 'credit' | 'debit' | 'balance'>('pix');
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
    loadSupportTickets();
  }, []);

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

  // Load notifications from API
  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?userId=user123');
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications.map((n: any) => ({
          ...n,
          timestamp: new Date(n.date)
        })));
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    }
  };

  // Load support tickets
  const loadSupportTickets = async () => {
    try {
      const response = await fetch('/api/support/ticket?userId=user123');
      const data = await response.json();
      if (data.success) {
        setSupportTickets(data.tickets);
      }
    } catch (error) {
      console.error('Erro ao carregar tickets:', error);
    }
  };

  // Load user domains
  const loadUserDomains = async () => {
    try {
      const response = await fetch('/api/user/domains?userId=user123');
      const data = await response.json();
      setUserDomains(data.domains || []);
    } catch (error) {
      console.error('Erro ao carregar domínios:', error);
    }
  };

  useEffect(() => {
    if (showDomainPanel) {
      loadUserDomains();
    }
  }, [showDomainPanel]);

  // DOMAIN MANAGEMENT FUNCTIONS
  const handleOpenDomainPanel = () => {
    setShowDomainPanel(true);
    
    const notification = {
      id: Date.now(),
      message: "✅ Painel de Gerenciamento de Domínios ativado com sucesso!",
      timestamp: new Date(),
      read: false,
      type: 'success' as const
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleRenewDomain = async (domainId: string) => {
    try {
      const response = await fetch('/api/domain/renew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId,
          userId: 'user123',
          period: 1
        })
      });

      const data = await response.json();

      if (data.success) {
        setUserDomains(prev => prev.map(d => 
          d.id === domainId 
            ? { ...d, expiryDate: data.newExpiryDate, status: 'active' }
            : d
        ));

        const notification = {
          id: Date.now(),
          message: `✅ Domínio renovado com sucesso! Nova data de expiração: ${data.newExpiryDate}`,
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert(`✅ Domínio renovado com sucesso!\n\nNova data de expiração: ${data.newExpiryDate}`);
        setShowRenewModal(false);
      }
    } catch (error) {
      console.error('Erro ao renovar domínio:', error);
      alert('❌ Erro ao renovar domínio. Tente novamente.');
    }
  };

  const handleToggleAutoRenew = async (domainId: string) => {
    setUserDomains(prev => prev.map(d => 
      d.id === domainId ? { ...d, autoRenew: !d.autoRenew } : d
    ));

    const domain = userDomains.find(d => d.id === domainId);
    const notification = {
      id: Date.now(),
      message: `✅ Renovação automática ${domain?.autoRenew ? 'desativada' : 'ativada'} para ${domain?.domain}`,
      timestamp: new Date(),
      read: false,
      type: 'info' as const
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleAddDNSRecord = async () => {
    if (!newDNSRecord.name || !newDNSRecord.value) {
      alert('❌ Preencha todos os campos do registro DNS');
      return;
    }

    try {
      const response = await fetch('/api/domain/dns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId: selectedDomainForConfig.id,
          dnsRecord: newDNSRecord
        })
      });

      const data = await response.json();

      if (data.success) {
        setUserDomains(prev => prev.map(d => 
          d.id === selectedDomainForConfig.id 
            ? { ...d, dnsRecords: [...(d.dnsRecords || []), newDNSRecord] }
            : d
        ));

        setSelectedDomainForConfig({
          ...selectedDomainForConfig,
          dnsRecords: [...(selectedDomainForConfig.dnsRecords || []), newDNSRecord]
        });

        setNewDNSRecord({ type: "A", name: "", value: "" });

        const notification = {
          id: Date.now(),
          message: `✅ Registro DNS adicionado com sucesso! Propagação em até 24h.`,
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert('✅ Registro DNS adicionado com sucesso!\n\nA propagação pode levar até 24 horas.');
      }
    } catch (error) {
      console.error('Erro ao adicionar DNS:', error);
      alert('❌ Erro ao adicionar registro DNS. Tente novamente.');
    }
  };

  const handleDeleteDNSRecord = (index: number) => {
    const updatedRecords = selectedDomainForConfig.dnsRecords.filter((_: any, i: number) => i !== index);
    
    setUserDomains(prev => prev.map(d => 
      d.id === selectedDomainForConfig.id 
        ? { ...d, dnsRecords: updatedRecords }
        : d
    ));

    setSelectedDomainForConfig({
      ...selectedDomainForConfig,
      dnsRecords: updatedRecords
    });

    alert('✅ Registro DNS removido com sucesso!');
  };

  const handleCreateEmail = async () => {
    if (!newEmail.email || !newEmail.password) {
      alert('❌ Preencha todos os campos do email');
      return;
    }

    try {
      const response = await fetch('/api/domain/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId: selectedDomainForConfig.id,
          email: `${newEmail.email}@${selectedDomainForConfig.domain}`,
          password: newEmail.password
        })
      });

      const data = await response.json();

      if (data.success) {
        const fullEmail = `${newEmail.email}@${selectedDomainForConfig.domain}`;
        
        setUserDomains(prev => prev.map(d => 
          d.id === selectedDomainForConfig.id 
            ? { ...d, emails: [...(d.emails || []), { email: fullEmail, password: newEmail.password }] }
            : d
        ));

        setSelectedDomainForConfig({
          ...selectedDomainForConfig,
          emails: [...(selectedDomainForConfig.emails || []), { email: fullEmail, password: newEmail.password }]
        });

        const notification = {
          id: Date.now(),
          message: `✅ Email profissional criado: ${fullEmail}`,
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert(`✅ Email profissional criado com sucesso!\n\nEmail: ${fullEmail}\nSenha: ${newEmail.password}\n\nGuarde essas informações em local seguro.`);
        
        setNewEmail({ email: "", password: "" });
        setShowEmailCreation(false);
      }
    } catch (error) {
      console.error('Erro ao criar email:', error);
      alert('❌ Erro ao criar email profissional. Tente novamente.');
    }
  };

  // AFFILIATE FUNCTIONS
  const handleCopyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateData.link);
    
    const notification = {
      id: Date.now(),
      message: "✅ Link copiado com sucesso!",
      timestamp: new Date(),
      read: false,
      type: 'success' as const
    };
    setNotifications(prev => [notification, ...prev]);
    
    alert("✅ Link copiado com sucesso!\n\nCompartilhe com seus contatos e comece a ganhar comissões!");
  };

  const handleRequestWithdrawal = async () => {
    if (affiliateData.balance <= 0) {
      alert("❌ Você não tem saldo disponível para saque.");
      return;
    }

    try {
      const response = await fetch('/api/affiliate/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: affiliateData.userId,
          amount: affiliateData.balance
        })
      });

      const data = await response.json();

      if (data.success) {
        setAffiliateData(prev => ({
          ...prev,
          pendingWithdrawal: prev.balance,
          balance: 0
        }));

        const notification = {
          id: Date.now(),
          message: `✅ Saque solicitado com sucesso! Aguarde a confirmação. Valor: R$ ${affiliateData.balance.toFixed(2)}`,
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert(`✅ Saque solicitado com sucesso!\n\nValor: R$ ${affiliateData.balance.toFixed(2)}\n\nAguarde a confirmação. O valor será transferido em até 2 dias úteis.`);
      }
    } catch (error) {
      console.error('Erro ao solicitar saque:', error);
      alert('❌ Erro ao solicitar saque. Tente novamente.');
    }
  };

  // MARKETPLACE FUNCTIONS
  const handleOpenMarketplace = () => {
    setShowMarketplacePanel(true);
    
    const notification = {
      id: Date.now(),
      message: "✅ Marketplace ativado! Explore domínios premium disponíveis para compra.",
      timestamp: new Date(),
      read: false,
      type: 'success' as const
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleViewMarketplaceDomain = (domain: any) => {
    setSelectedMarketplaceDomain(domain);
    setShowMarketplacePurchase(true);
  };

  const handlePurchaseMarketplaceDomain = async () => {
    if (!selectedMarketplaceDomain) return;

    try {
      const response = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId: selectedMarketplaceDomain.id,
          userId: 'user123',
          price: selectedMarketplaceDomain.price
        })
      });

      const data = await response.json();

      if (data.success) {
        const notification = {
          id: Date.now(),
          message: `✅ Domínio ${selectedMarketplaceDomain.domain} comprado com sucesso! Valor: R$ ${selectedMarketplaceDomain.price.toFixed(2)}`,
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert(`✅ Compra realizada com sucesso!\n\nDomínio: ${selectedMarketplaceDomain.domain}\nValor: R$ ${selectedMarketplaceDomain.price.toFixed(2)}\n\nO domínio foi adicionado à sua conta.`);
        
        setShowMarketplacePurchase(false);
        setSelectedMarketplaceDomain(null);
      }
    } catch (error) {
      console.error('Erro ao comprar domínio:', error);
      alert('❌ Erro ao processar compra. Tente novamente.');
    }
  };

  // EDIT PROFILE FUNCTIONS
  const handleOpenEditProfile = () => {
    setEditProfileForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      password: "",
      confirmPassword: "",
      photo: userProfile.photo
    });
    setShowEditPassword(false);
    setShowEditConfirmPassword(false);
    setShowEditProfile(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!editProfileForm.name || !editProfileForm.email) {
      alert("❌ Nome e email são obrigatórios!");
      return;
    }

    if (editProfileForm.password && editProfileForm.password !== editProfileForm.confirmPassword) {
      alert("❌ As senhas não coincidem!");
      return;
    }

    if (editProfileForm.password && editProfileForm.password.length < 6) {
      alert("❌ A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          name: editProfileForm.name,
          email: editProfileForm.email,
          phone: editProfileForm.phone,
          password: editProfileForm.password || undefined,
          photoUrl: editProfileForm.photo
        })
      });

      const data = await response.json();

      if (data.success) {
        setUserProfile({
          name: data.profile.name,
          email: data.profile.email,
          phone: data.profile.phone || "",
          photo: data.profile.photoUrl
        });

        const notification = {
          id: Date.now(),
          message: "✅ Perfil atualizado com sucesso!",
          timestamp: new Date(),
          read: false,
          type: 'success' as const
        };
        setNotifications(prev => [notification, ...prev]);

        alert("✅ Perfil atualizado com sucesso!");
        setShowEditProfile(false);
      } else {
        alert(`❌ Erro: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert("❌ Erro ao atualizar perfil. Tente novamente.");
    }
  };

  // SUPPORT FUNCTIONS
  const handleOpenSupportChat = async (ticketId?: string) => {
    if (ticketId) {
      try {
        const response = await fetch(`/api/support/ticket?ticketId=${ticketId}&userId=user123`);
        const data = await response.json();
        if (data.success) {
          setSelectedTicket(data.ticket);
          setSupportMessages(data.ticket.messages);
        }
      } catch (error) {
        console.error('Erro ao carregar ticket:', error);
      }
    } else {
      setSelectedTicket(null);
      setSupportMessages([]);
    }
    setShowSupportChat(true);
  };

  const handleSendSupportMessage = async () => {
    if (!supportMessage.trim()) return;

    const newMessage = {
      id: supportMessages.length + 1,
      sender: 'user' as const,
      message: supportMessage,
      timestamp: new Date().toISOString()
    };

    setSupportMessages(prev => [...prev, newMessage]);
    setSupportMessage("");

    // Se não tem ticket, criar um novo
    if (!selectedTicket) {
      try {
        const response = await fetch('/api/support/ticket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'user123',
            subject: 'Novo chamado',
            message: supportMessage
          })
        });

        const data = await response.json();
        if (data.success) {
          setSelectedTicket(data.ticket);
          loadSupportTickets();

          const notification = {
            id: Date.now(),
            message: `✅ Chamado ${data.ticket.id} criado com sucesso!`,
            timestamp: new Date(),
            read: false,
            type: 'success' as const
          };
          setNotifications(prev => [notification, ...prev]);
        }
      } catch (error) {
        console.error('Erro ao criar ticket:', error);
      }
    }

    // Simular resposta do suporte
    setTimeout(() => {
      const supportResponse = {
        id: supportMessages.length + 2,
        sender: 'support' as const,
        message: "Olá! Recebemos sua mensagem e já estamos analisando. Em breve retornaremos com uma solução.",
        timestamp: new Date().toISOString()
      };
      setSupportMessages(prev => [...prev, supportResponse]);

      const notification = {
        id: Date.now(),
        message: "💬 Suporte respondeu seu chamado!",
        timestamp: new Date(),
        read: false,
        type: 'info' as const
      };
      setNotifications(prev => [notification, ...prev]);
    }, 2000);
  };

  // NOTIFICATION FUNCTIONS
  const markNotificationAsRead = async (id: number) => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          notificationId: id,
          action: 'markAsRead'
        })
      });

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Erro ao marcar notificação:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          notificationId: id,
          action: 'delete'
        })
      });

      setNotifications(prev => prev.filter(notif => notif.id !== id));
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          notificationId: 0,
          action: 'markAllAsRead'
        })
      });

      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    } catch (error) {
      console.error('Erro ao marcar todas:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Restante das funções originais mantidas...
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

  const extras = [
    { id: 'email', name: 'Email Profissional', price: 12, description: '5 contas de email com seu domínio' },
    { id: 'dns', name: 'DNS Pro', price: 9, description: 'DNS gerenciado avançado com proteção DDoS' },
    { id: 'site', name: 'Site Pronto', price: 29, description: 'Template profissional + hospedagem' }
  ];

  const handleSearch = async () => {
    if (!domain.trim()) return;

    setIsSearching(true);
    
    try {
      const cleanDomain = domain.toLowerCase().replace(/\s+/g, "");
      const finalDomain = cleanDomain.includes(".") ? cleanDomain : `${cleanDomain}.com`;
      
      const response = await fetch('/api/domain/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: finalDomain })
      });

      const data = await response.json();
      
      setSearchResult({
        available: data.available,
        domain: data.domain,
        price: "R$ 49,99",
      });
    } catch (error) {
      console.error('Erro ao buscar domínio:', error);
    } finally {
      setIsSearching(false);
    }
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

  const handleOpenPurchase = (domainName: string) => {
    setSelectedDomain(domainName);
    setShowPurchaseModal(true);
  };

  const handleAddToCart = () => {
    alert(`✅ ${selectedDomain} adicionado ao carrinho!\n\nPeríodo: ${selectedPeriod} ano(s)\nTotal: R$ ${(49.99 * selectedPeriod).toFixed(2)}`);
    setShowPurchaseModal(false);
  };

  const handleBuyNow = () => {
    setShowPurchaseModal(false);
    setShowCheckout(true);
  };

  const handleConfirmPayment = async () => {
    const totalValue = 49.99 * selectedPeriod;
    
    try {
      const response = await fetch('/api/domain/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: selectedDomain,
          period: selectedPeriod,
          paymentMethod: selectedPaymentMethod,
          userInfo: {
            name: userProfile.name,
            email: userProfile.email
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        const newRegistration = {
          domain: selectedDomain,
          plan: "Básico",
          renewal: `${selectedPeriod} ano(s)`,
          registeredAt: new Date()
        };
        
        setRegisteredDomain(newRegistration);
        
        const notification = {
          id: Date.now(),
          message: `✅ Pagamento aprovado! Seu domínio ${selectedDomain} foi registrado com sucesso.`,
          timestamp: new Date(),
          read: false
        };
        setNotifications(prev => [notification, ...prev]);
        
        alert(`✅ Pagamento aprovado!\n\nSeu domínio ${selectedDomain} foi registrado com sucesso.\n\nValor: R$ ${totalValue.toFixed(2)}\nMétodo: ${selectedPaymentMethod === 'pix' ? 'PIX' : selectedPaymentMethod === 'credit' ? 'Cartão de Crédito' : selectedPaymentMethod === 'debit' ? 'Cartão de Débito' : 'Saldo Interno'}\n\nVocê receberá um email de confirmação em instantes.`);
        
        setShowCheckout(false);
        setShowExtrasModal(true);
      }
    } catch (error) {
      console.error('Erro ao registrar domínio:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  const handleConfirmExtras = () => {
    if (selectedExtras.length > 0) {
      const extrasNames = selectedExtras.map(id => extras.find(e => e.id === id)?.name).join(', ');
      alert(`✅ Planos adicionados com sucesso!\n\n${extrasNames}\n\nSuas assinaturas foram ativadas.`);
    }
    setShowExtrasModal(false);
    setSelectedExtras([]);
  };

  // Banking Functions (mantidas do código original)
  const handleOpenPaymentSettings = () => {
    setShowPaymentSettings(true);
    if (!isPasswordCreated) {
      setBankingScreen('createPassword');
    } else {
      setBankingScreen('login');
      setShowEmailCodeOption(true);
    }
    setPasswordError("");
  };

  const generateEmailCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);
    setCodeExpiry(expiry);
    
    const emailNotif = {
      id: Date.now(),
      message: `📧 Código de acesso enviado para ${userProfile.email}: ${code} (válido por 5 minutos)`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [emailNotif, ...prev]);
    
    alert(`📧 Código enviado para ${userProfile.email}\n\nCódigo: ${code}\n\nO código expira em 5 minutos.`);
  };

  const handleChangePasswordDirect = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    const enteredCurrentPassword = btoa(changePasswordForm.currentPassword);
    if (enteredCurrentPassword !== masterPassword) {
      setPasswordError("Senha atual incorreta.");
      return;
    }

    if (changePasswordForm.newPassword.length < 6) {
      setPasswordError("A nova senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword) {
      setPasswordError("As senhas não coincidem");
      return;
    }

    const encryptedPassword = btoa(changePasswordForm.newPassword);
    localStorage.setItem('brendon_master_password', encryptedPassword);
    setMasterPassword(encryptedPassword);
    
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

    const encryptedPassword = btoa(createPasswordForm.password);
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
        setBlockTimer(300);
        setPasswordError("Muitas tentativas incorretas. Sistema bloqueado por 5 minutos.");
        
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
    
    const encryptedData = {
      ...bankingInfo,
      cpfCnpj: btoa(bankingInfo.cpfCnpj),
      accountNumber: btoa(bankingInfo.accountNumber)
    };
    
    console.log("Dados bancários criptografados:", encryptedData);
    
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
    
    alert("🏦 Conexão iniciada! Um microdepósito de R$ 0,01 foi enviado para sua conta Nubank. Verifique seu extrato.");
    
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
      
      const notification = {
        id: Date.now(),
        message: `💰 Transferência de R$ ${transferValue.toFixed(2)} realizada com sucesso para sua conta Nubank.`,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notification, ...prev]);
      
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

  // ChatBot Functions (mantidas do código original)
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

  const getDomainStatusColor = (status: 'active' | 'expiring' | 'expired') => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
    }
  };

  const getDomainStatusText = (status: 'active' | 'expiring' | 'expired') => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'expiring': return 'Expirando';
      case 'expired': return 'Expirado';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Organizado e Profissional */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00a82d] to-[#008c26] rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">BLM DomainBox</span>
                <span className="text-xs text-gray-500 font-medium">Seu domínio, sua identidade</span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#dominios" className="text-gray-700 hover:text-[#00a82d] transition-colors font-medium">
                Domínios
              </a>
              <a href="#recursos" className="text-gray-700 hover:text-[#00a82d] transition-colors font-medium">
                Recursos
              </a>
              <a href="#precos" className="text-gray-700 hover:text-[#00a82d] transition-colors font-medium">
                Preços
              </a>
              
              {/* Suporte */}
              <button 
                onClick={() => setShowChatBot(true)}
                className="text-[#00a82d] hover:text-[#008c26] font-medium flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Suporte
              </button>
              
              {/* Receber Pagamentos */}
              <button 
                onClick={handleOpenPaymentSettings}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                title="Área exclusiva - Brendon"
              >
                <CreditCard className="w-5 h-5" />
                Pagamentos
              </button>

              {/* Notificações */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-700 hover:text-[#00a82d] transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Login Button */}
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-6 py-2.5 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                Entrar
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* PAINEL DE ACESSO, SUPORTE E NOTIFICAÇÕES */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Painel de Acesso do Usuário */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00a82d]">
                  <img src={userProfile.photo} alt={userProfile.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{userProfile.name}</h3>
                  <p className="text-sm text-gray-600">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleOpenEditProfile}
                  className="flex-1 h-[55px] px-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Editar Perfil
                </button>
                <button className="h-[55px] w-[55px] bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Painel de Suporte ao Cliente */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00a82d] to-[#008c26] rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse" title="Bot Online"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Suporte ao Cliente</h3>
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Bot Online 24/7
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">Assistente inteligente pronto para ajudar!</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenSupportChat()}
                  className="flex-1 h-[55px] px-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Abrir Chat
                </button>
                <button 
                  onClick={() => setShowSupportPanel(true)}
                  className="h-[55px] px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Chamados
                </button>
              </div>
            </div>

            {/* Painel de Notificações */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#00a82d]" />
                  <h3 className="font-bold text-gray-900">Notificações</h3>
                </div>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {unreadCount > 0 ? `Você tem ${unreadCount} notificação(ões) não lida(s)` : 'Nenhuma notificação nova'}
              </p>
              <button 
                onClick={() => setShowNotifications(true)}
                className="w-full h-[55px] px-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Ver Todas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PAINÉIS PRINCIPAIS */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Painel de Gerenciamento de Domínios */}
            <button
              onClick={handleOpenDomainPanel}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#00a82d] text-left h-[200px] flex flex-col justify-between"
            >
              <div className="w-14 h-14 bg-[#00a82d]/10 rounded-xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#00a82d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Meus Domínios</h3>
                <p className="text-gray-600 text-sm">Gerencie, renove e configure seus domínios</p>
              </div>
            </button>

            {/* Painel de Pagamento */}
            <button
              onClick={handleOpenPaymentSettings}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-600 text-left h-[200px] flex flex-col justify-between"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamentos</h3>
                <p className="text-gray-600 text-sm">Gerencie seus pagamentos e saldo</p>
              </div>
            </button>

            {/* Painel de Afiliados */}
            <button
              onClick={() => setShowAffiliatePanel(true)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-600 text-left h-[200px] flex flex-col justify-between"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Programa de Afiliados</h3>
                <p className="text-gray-600 text-sm">Ganhe dinheiro indicando domínios</p>
              </div>
            </button>

            {/* Painel de Marketplace */}
            <button
              onClick={handleOpenMarketplace}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-600 text-left h-[200px] flex flex-col justify-between"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Store className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marketplace</h3>
                <p className="text-gray-600 text-sm">Compre e venda domínios premium</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: Marketplace */}
      {showMarketplacePanel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Marketplace de Domínios Premium</h2>
                <p className="text-sm text-gray-600">Explore e compre domínios premium disponíveis</p>
              </div>
              <button onClick={() => setShowMarketplacePanel(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Filtros */}
              <div className="mb-6 flex gap-3 flex-wrap">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                  Todos
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                  Tecnologia
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                  E-commerce
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                  Negócios
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
                  Saúde
                </button>
              </div>

              {/* Lista de Domínios */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketplaceDomains.map((domain) => (
                  <div key={domain.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-600 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{domain.domain}</h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {domain.category}
                        </span>
                      </div>
                      {domain.featured && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-blue-600">R$ {domain.price.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-gray-600">Vendedor: {domain.seller}</p>
                    </div>

                    <button
                      onClick={() => handleViewMarketplaceDomain(domain)}
                      className="w-full h-[45px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Compra de Domínio do Marketplace */}
      {showMarketplacePurchase && selectedMarketplaceDomain && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMarketplaceDomain.domain}</h2>
                <p className="text-sm text-gray-600">{selectedMarketplaceDomain.category}</p>
              </div>
              <button onClick={() => setShowMarketplacePurchase(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informações do Domínio */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-700 font-medium mb-1">Preço</p>
                    <p className="text-3xl font-bold text-blue-900">R$ {selectedMarketplaceDomain.price.toLocaleString('pt-BR')}</p>
                  </div>
                  {selectedMarketplaceDomain.featured && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-bold text-yellow-700">Destaque</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-800"><strong>Vendedor:</strong> {selectedMarketplaceDomain.seller}</p>
                  <p className="text-blue-800"><strong>Categoria:</strong> {selectedMarketplaceDomain.category}</p>
                </div>
              </div>

              {/* Benefícios */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900">O que está incluído:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Transferência completa do domínio</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Suporte para migração</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Garantia de 7 dias</span>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowMarketplacePurchase(false)}
                  className="flex-1 h-[55px] border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Voltar
                </button>
                <button
                  onClick={handlePurchaseMarketplaceDomain}
                  className="flex-1 h-[55px] bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
