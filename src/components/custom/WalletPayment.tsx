"use client";

import { useState } from "react";
import { Smartphone, Check } from "lucide-react";

interface WalletPaymentProps {
  amount: number;
  onSuccess: () => void;
}

type WalletType = "apple" | "google" | "paypal";

export default function WalletPayment({ amount, onSuccess }: WalletPaymentProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const wallets = [
    {
      id: "apple" as WalletType,
      name: "Apple Pay",
      icon: "🍎",
      description: "Pague com Face ID ou Touch ID",
      available: true,
    },
    {
      id: "google" as WalletType,
      name: "Google Pay",
      icon: "🔵",
      description: "Pague com sua conta Google",
      available: true,
    },
    {
      id: "paypal" as WalletType,
      name: "PayPal",
      icon: "💙",
      description: "Pague com saldo ou cartão PayPal",
      available: true,
    },
  ];

  const handleWalletPayment = (walletType: WalletType) => {
    setSelectedWallet(walletType);
    setIsProcessing(true);

    // Simula processamento do pagamento
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Informação do Valor */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-600 mb-2">Valor a pagar</p>
        <p className="text-4xl font-bold text-[#00a82d]">
          R$ {amount.toFixed(2)}
        </p>
      </div>

      {/* Opções de Carteiras */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Escolha sua carteira digital
        </h3>
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletPayment(wallet.id)}
              disabled={!wallet.available || isProcessing}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                selectedWallet === wallet.id
                  ? "border-[#00a82d] bg-green-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              } ${
                !wallet.available || isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                  {wallet.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg mb-1">
                    {wallet.name}
                  </h4>
                  <p className="text-sm text-gray-600">{wallet.description}</p>
                  {!wallet.available && (
                    <p className="text-sm text-red-600 mt-1">
                      Não disponível no momento
                    </p>
                  )}
                </div>
                {selectedWallet === wallet.id && isProcessing ? (
                  <div className="w-6 h-6 border-2 border-[#00a82d] border-t-transparent rounded-full animate-spin" />
                ) : (
                  selectedWallet === wallet.id && (
                    <Check className="w-6 h-6 text-[#00a82d]" />
                  )
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Informações de Segurança */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              Pagamento rápido e seguro
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Confirmação instantânea do pagamento</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Seus dados não são compartilhados conosco</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Proteção contra fraudes incluída</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Registro do domínio ativado imediatamente</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vantagens */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h4 className="font-semibold text-green-900 mb-3">
          Vantagens das carteiras digitais:
        </h4>
        <ul className="space-y-2 text-sm text-green-800">
          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>Pagamento em um clique, sem digitar dados do cartão</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>Confirmação instantânea e registro imediato</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>Máxima segurança com autenticação biométrica</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">✓</span>
            <span>Recibo digital enviado automaticamente</span>
          </li>
        </ul>
      </div>

      {isProcessing && (
        <div className="bg-white border-2 border-[#00a82d] rounded-xl p-6 text-center">
          <div className="w-16 h-16 border-4 border-[#00a82d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Processando pagamento...
          </p>
          <p className="text-sm text-gray-600">
            Aguarde enquanto confirmamos seu pagamento com {wallets.find(w => w.id === selectedWallet)?.name}
          </p>
        </div>
      )}

      <p className="text-xs text-center text-gray-500">
        Ao confirmar o pagamento, você concorda com nossos{" "}
        <a href="#" className="text-[#00a82d] hover:underline">
          Termos de Serviço
        </a>
      </p>
    </div>
  );
}
