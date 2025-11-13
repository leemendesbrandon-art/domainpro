"use client";

import { useState, useEffect } from "react";
import { Copy, Check, QrCode, Clock } from "lucide-react";

interface PixPaymentProps {
  amount: number;
  onSuccess: () => void;
}

export default function PixPayment({ amount, onSuccess }: PixPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [isChecking, setIsChecking] = useState(false);

  // Código Pix fictício (em produção, viria da API de pagamento)
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540549.995802BR5925DOMAINPRO LTDA6009SAO PAULO62070503***63041D3D";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const handleCheckPayment = () => {
    setIsChecking(true);
    
    // Simula verificação de pagamento (em produção, consultaria API)
    setTimeout(() => {
      setIsChecking(false);
      // Simula pagamento confirmado (50% de chance para demo)
      if (Math.random() > 0.5) {
        onSuccess();
      } else {
        alert("Pagamento ainda não identificado. Aguarde alguns instantes e tente novamente.");
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm font-medium text-orange-900">
              Tempo restante para pagamento
            </p>
            <p className="text-2xl font-bold text-orange-600">
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Escaneie o QR Code
          </h3>
          <p className="text-sm text-gray-600">
            Use o app do seu banco para escanear
          </p>
        </div>

        {/* QR Code Placeholder */}
        <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center mb-4">
          <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center border-4 border-gray-300">
            <QrCode className="w-32 h-32 text-gray-400" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Valor a pagar</p>
          <p className="text-3xl font-bold text-[#00a82d]">
            R$ {amount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Código Pix */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Ou copie o código Pix
          </label>
          {copied && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Copiado!
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={pixCode}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono"
          />
          <button
            onClick={handleCopy}
            className="px-6 py-3 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors flex items-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copiar
          </button>
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-3">Como pagar com Pix:</h4>
        <ol className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Abra o app do seu banco</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>Escolha pagar com Pix QR Code ou Pix Copia e Cola</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>Escaneie o código ou cole o código copiado</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Confirme o pagamento no seu banco</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">5.</span>
            <span>Aguarde a confirmação automática (geralmente instantânea)</span>
          </li>
        </ol>
      </div>

      {/* Botão de Verificação */}
      <button
        onClick={handleCheckPayment}
        disabled={isChecking}
        className="w-full px-6 py-4 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isChecking ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Verificando pagamento...
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            Já paguei - Verificar pagamento
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        O pagamento é confirmado automaticamente em tempo real. Caso não seja identificado imediatamente, aguarde alguns instantes.
      </p>
    </div>
  );
}
