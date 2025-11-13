"use client";

import { useState } from "react";
import { CreditCard, Lock, Calendar, User } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  isProcessing: boolean;
}

export default function PaymentForm({ amount, onSuccess, isProcessing }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    installments: "1",
    saveCard: false,
  });

  const handleCardNumberChange = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    // Adiciona espaços a cada 4 dígitos
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
    setFormData({ ...formData, cardNumber: formatted.slice(0, 19) });
  };

  const handleExpiryChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length >= 2) {
      formatted = numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    setFormData({ ...formData, expiryDate: formatted.slice(0, 5) });
  };

  const handleCvvChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    setFormData({ ...formData, cvv: numbers.slice(0, 4) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  const installmentOptions = [
    { value: "1", label: `1x de R$ ${amount.toFixed(2)} sem juros` },
    { value: "2", label: `2x de R$ ${(amount / 2).toFixed(2)} sem juros` },
    { value: "3", label: `3x de R$ ${(amount / 3).toFixed(2)} sem juros` },
    { value: "6", label: `6x de R$ ${(amount / 6).toFixed(2)} sem juros` },
    { value: "12", label: `12x de R$ ${(amount / 12).toFixed(2)} sem juros` },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Número do Cartão */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
          Número do Cartão
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
            required
          />
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Nome no Cartão */}
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
          Nome no Cartão
        </label>
        <div className="relative">
          <input
            type="text"
            id="cardName"
            value={formData.cardName}
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value.toUpperCase() })}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all uppercase"
            required
          />
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Validade e CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
            Validade
          </label>
          <div className="relative">
            <input
              type="text"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/AA"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
              required
            />
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <div className="relative">
            <input
              type="text"
              id="cvv"
              value={formData.cvv}
              onChange={(e) => handleCvvChange(e.target.value)}
              placeholder="123"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
              required
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Parcelamento */}
      <div>
        <label htmlFor="installments" className="block text-sm font-medium text-gray-700 mb-2">
          Parcelamento
        </label>
        <select
          id="installments"
          value={formData.installments}
          onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00a82d] focus:border-transparent outline-none transition-all"
        >
          {installmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Salvar Cartão */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="saveCard"
          checked={formData.saveCard}
          onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
          className="w-4 h-4 text-[#00a82d] rounded border-gray-300 focus:ring-[#00a82d]"
        />
        <label htmlFor="saveCard" className="text-sm text-gray-700 cursor-pointer">
          Salvar cartão para futuras compras (seguro e criptografado)
        </label>
      </div>

      {/* Botão de Pagamento */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full px-6 py-4 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Pagar R$ {amount.toFixed(2)}
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        Ao confirmar o pagamento, você concorda com nossos{" "}
        <a href="#" className="text-[#00a82d] hover:underline">
          Termos de Serviço
        </a>
      </p>
    </form>
  );
}
