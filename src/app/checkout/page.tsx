"use client";

import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, FileText, Wallet, Check, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import PaymentForm from "@/components/custom/PaymentForm";
import PixPayment from "@/components/custom/PixPayment";
import BoletoPayment from "@/components/custom/BoletoPayment";
import WalletPayment from "@/components/custom/WalletPayment";

type PaymentMethod = "card" | "pix" | "boleto" | "wallet";

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dados do domínio (em produção, viria de um contexto/estado global)
  const domainData = {
    domain: "meudominio.com",
    price: 49.99,
    period: "1 ano",
  };

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      name: "Cartão de Crédito/Débito",
      icon: CreditCard,
      description: "Parcelamento em até 12x",
    },
    {
      id: "pix" as PaymentMethod,
      name: "Pix",
      icon: Smartphone,
      description: "Aprovação instantânea",
    },
    {
      id: "boleto" as PaymentMethod,
      name: "Boleto Bancário",
      icon: FileText,
      description: "Vencimento em 3 dias",
    },
    {
      id: "wallet" as PaymentMethod,
      name: "Carteiras Digitais",
      icon: Wallet,
      description: "Apple Pay, Google Pay, PayPal",
    },
  ];

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    
    // Simula processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Redireciona para página principal após 3 segundos
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pagamento Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Seu domínio <span className="font-bold text-[#00a82d]">{domainData.domain}</span> foi registrado com sucesso!
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Domínio:</span>
              <span className="font-semibold text-gray-900">{domainData.domain}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Período:</span>
              <span className="font-semibold text-gray-900">{domainData.period}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Valor pago:</span>
              <span className="font-semibold text-[#00a82d]">
                R$ {domainData.price.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600" />
              <span>Recibo enviado para seu email</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600" />
              <span>Domínio ativado e pronto para uso</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-green-600" />
              <span>Acesso liberado no painel de controle</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Redirecionando em alguns segundos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área de Pagamento */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Finalizar Pagamento
              </h1>
              <p className="text-gray-600 mb-8">
                Escolha a forma de pagamento e complete seu registro
              </p>

              {/* Métodos de Pagamento */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Forma de Pagamento
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedMethod === method.id
                          ? "border-[#00a82d] bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedMethod === method.id
                              ? "bg-[#00a82d] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <method.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                        </div>
                        {selectedMethod === method.id && (
                          <Check className="w-5 h-5 text-[#00a82d]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Formulário de Pagamento */}
              <div>
                {selectedMethod === "card" && (
                  <PaymentForm
                    amount={domainData.price}
                    onSuccess={handlePaymentSuccess}
                    isProcessing={isProcessing}
                  />
                )}
                {selectedMethod === "pix" && (
                  <PixPayment
                    amount={domainData.price}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
                {selectedMethod === "boleto" && (
                  <BoletoPayment
                    amount={domainData.price}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
                {selectedMethod === "wallet" && (
                  <WalletPayment
                    amount={domainData.price}
                    onSuccess={handlePaymentSuccess}
                  />
                )}
              </div>

              {/* Segurança */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>
                    Seus dados estão protegidos com criptografia SSL de 256 bits
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#00a82d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#00a82d]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {domainData.domain}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Registro por {domainData.period}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {domainData.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Proteção de Privacidade</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Certificado SSL</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#00a82d]">
                  R$ {domainData.price.toFixed(2)}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Renovação automática opcional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Suporte 24/7 incluído</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Garantia de 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
