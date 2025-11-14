"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Lock, Mail, Smartphone, ArrowLeft, Check, Shield, Clock, AlertCircle } from "lucide-react";

type Step = "email" | "verification" | "newPassword" | "success";

export default function RecuperarSenha() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeExpiry, setCodeExpiry] = useState(600); // 10 minutos em segundos
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak");

  // Simular envio de código
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de envio
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("verification");
      // Iniciar contagem regressiva
      startCountdown();
    }, 1500);
  };

  // Contagem regressiva do código
  const startCountdown = () => {
    const interval = setInterval(() => {
      setCodeExpiry((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Verificar código
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (formData.verificationCode.length === 6) {
        setCurrentStep("newPassword");
      } else {
        alert("Código inválido. Tente novamente.");
      }
    }, 1000);
  };

  // Reenviar código
  const handleResendCode = () => {
    setCodeExpiry(600);
    startCountdown();
    alert("Novo código enviado!");
  };

  // Validar força da senha
  const validatePasswordStrength = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough].filter(Boolean).length;

    if (strength <= 2) return "weak";
    if (strength <= 4) return "medium";
    return "strong";
  };

  // Redefinir senha
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres!");
      return;
    }

    if (passwordStrength === "weak") {
      alert("Escolha uma senha mais forte!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("success");
      // Enviar email de confirmação (simulado)
      console.log("Email de segurança enviado");
    }, 1500);
  };

  // Formatar tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-[#00a82d]" />
              <span className="text-2xl font-bold text-gray-900">DomainPro</span>
            </div>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-[#00a82d] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {["email", "verification", "newPassword", "success"].map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep === step
                      ? "bg-[#00a82d] text-white scale-110"
                      : ["email", "verification", "newPassword", "success"].indexOf(currentStep) >
                        ["email", "verification", "newPassword", "success"].indexOf(step)
                      ? "bg-[#00a82d] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {["email", "verification", "newPassword", "success"].indexOf(currentStep) >
                  ["email", "verification", "newPassword", "success"].indexOf(step) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      ["email", "verification", "newPassword", "success"].indexOf(currentStep) > index
                        ? "bg-[#00a82d]"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Email/Phone */}
        {currentStep === "email" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00a82d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#00a82d]" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recuperar Senha</h1>
              <p className="text-gray-600">
                Escolha como deseja receber o código de verificação
              </p>
            </div>

            <form onSubmit={handleSendCode} className="space-y-6">
              {/* Método de Contato */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setContactMethod("email")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    contactMethod === "email"
                      ? "border-[#00a82d] bg-[#00a82d]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Mail className={`w-6 h-6 mx-auto mb-2 ${contactMethod === "email" ? "text-[#00a82d]" : "text-gray-400"}`} />
                  <p className="font-medium text-gray-900">Email</p>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod("phone")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    contactMethod === "phone"
                      ? "border-[#00a82d] bg-[#00a82d]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Smartphone className={`w-6 h-6 mx-auto mb-2 ${contactMethod === "phone" ? "text-[#00a82d]" : "text-gray-400"}`} />
                  <p className="font-medium text-gray-900">SMS</p>
                </button>
              </div>

              {/* Input de Email ou Telefone */}
              {contactMethod === "email" ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email cadastrado
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone cadastrado
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              )}

              {/* Lembrar Dispositivo */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 text-[#00a82d] rounded border-gray-300 focus:ring-[#00a82d]"
                />
                <span className="text-sm text-gray-600">Lembrar este dispositivo como confiável</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
              </button>
            </form>

            {/* Ajuda */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Precisa de ajuda?{" "}
                <a href="#" className="text-[#00a82d] hover:text-[#008c26] font-medium">
                  Falar com Suporte
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Verification Code */}
        {currentStep === "verification" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00a82d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#00a82d]" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verificar Código</h1>
              <p className="text-gray-600">
                Enviamos um código de 6 dígitos para{" "}
                <span className="font-semibold text-gray-900">
                  {contactMethod === "email" ? formData.email : formData.phone}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-6">
              {/* Código de Verificação */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Código de verificação
                </label>
                <input
                  type="text"
                  id="code"
                  maxLength={6}
                  value={formData.verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, verificationCode: value });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all text-center text-2xl font-bold tracking-widest"
                  placeholder="000000"
                  required
                />
              </div>

              {/* Tempo Restante */}
              <div className="flex items-center justify-center gap-2 text-sm">
                {codeExpiry > 0 ? (
                  <>
                    <Clock className="w-4 h-4 text-[#00a82d]" />
                    <span className="text-gray-600">
                      Código expira em <span className="font-bold text-[#00a82d]">{formatTime(codeExpiry)}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 font-medium">Código expirado</span>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || formData.verificationCode.length !== 6 || codeExpiry === 0}
                className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verificando..." : "Verificar Código"}
              </button>

              {/* Reenviar Código */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={codeExpiry > 540}
                  className="text-sm text-[#00a82d] hover:text-[#008c26] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Não recebeu? Reenviar código
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: New Password */}
        {currentStep === "newPassword" && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00a82d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#00a82d]" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Senha</h1>
              <p className="text-gray-600">Crie uma senha forte e segura</p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Nova Senha */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                      setPasswordStrength(validatePasswordStrength(e.target.value));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>

                {/* Indicador de Força */}
                {formData.newPassword && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "weak" ? "bg-red-500" : "bg-gray-200"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "medium" || passwordStrength === "strong"
                            ? "bg-yellow-500"
                            : "bg-gray-200"
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength === "weak"
                          ? "text-red-500"
                          : passwordStrength === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      Força da senha:{" "}
                      {passwordStrength === "weak" ? "Fraca" : passwordStrength === "medium" ? "Média" : "Forte"}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirmar Senha */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
                  placeholder="Digite a senha novamente"
                  required
                />
              </div>

              {/* Requisitos da Senha */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Sua senha deve conter:</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        formData.newPassword.length >= 8 ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Mínimo de 8 caracteres
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        /[A-Z]/.test(formData.newPassword) ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Letras maiúsculas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        /[a-z]/.test(formData.newPassword) ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Letras minúsculas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        /\d/.test(formData.newPassword) ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Números
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className={`w-4 h-4 ${
                        /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? "text-green-500" : "text-gray-300"
                      }`}
                    />
                    Caracteres especiais (!@#$%...)
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Redefinindo..." : "Redefinir Senha"}
              </button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {currentStep === "success" && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Senha Redefinida!</h1>
            <p className="text-gray-600 mb-2">
              Sua senha foi alterada com sucesso.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Um email de confirmação foi enviado para sua segurança.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push("/")}
                className="w-full px-6 py-3 bg-[#00a82d] text-white rounded-lg hover:bg-[#008c26] transition-colors font-semibold text-lg"
              >
                Fazer Login
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Voltar ao Início
              </button>
            </div>

            {/* Histórico de Acessos */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900 mb-1">Dica de Segurança</p>
                  <p className="text-xs text-blue-700">
                    Acesse seu painel para visualizar o histórico de acessos e ativar a autenticação em dois fatores para maior segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
