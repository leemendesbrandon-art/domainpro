"use client";

import { useState } from "react";
import { FileText, Download, Copy, Check, Calendar, AlertCircle } from "lucide-react";

interface BoletoPaymentProps {
  amount: number;
  onSuccess: () => void;
}

export default function BoletoPayment({ amount, onSuccess }: BoletoPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [boletoGenerated, setBoletoGenerated] = useState(false);

  // Código de barras fictício (em produção, viria da API)
  const barcodeNumber = "23793.38128 60000.000001 23456.789012 3 98760000049999";
  
  // Data de vencimento (3 dias úteis)
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 3);
  const dueDateFormatted = dueDate.toLocaleDateString("pt-BR");

  const handleGenerateBoleto = () => {
    setBoletoGenerated(true);
    // Em produção, aqui faria a chamada para API gerar o boleto
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(barcodeNumber.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  const handleDownload = () => {
    // Em produção, baixaria o PDF do boleto
    alert("Em produção, o boleto seria baixado em PDF");
  };

  const handleConfirm = () => {
    // Simula confirmação (em produção, o boleto seria registrado e aguardaria compensação)
    alert("Boleto gerado com sucesso! Você receberá um email com o boleto e instruções de pagamento.");
    onSuccess();
  };

  if (!boletoGenerated) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Gerar Boleto Bancário
          </h3>
          <p className="text-gray-600 mb-4">
            Clique no botão abaixo para gerar seu boleto de pagamento
          </p>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Valor:</span>
              <span className="text-2xl font-bold text-[#00a82d]">
                R$ {amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vencimento:</span>
              <span className="font-semibold text-gray-900">{dueDateFormatted}</span>
            </div>
          </div>
          <button
            onClick={handleGenerateBoleto}
            className="w-full px-6 py-4 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold text-lg flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Gerar Boleto
          </button>
        </div>

        {/* Informações */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Informações importantes:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Boleto válido por 3 dias úteis</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Compensação em até 2 dias úteis após o pagamento</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Registro automático após compensação bancária</span>
            </li>
            <li className="flex gap-2">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span>Você receberá o boleto por email</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerta de Vencimento */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-900 mb-1">
              Vencimento: {dueDateFormatted}
            </p>
            <p className="text-sm text-orange-800">
              Pague até esta data para garantir o registro do seu domínio
            </p>
          </div>
        </div>
      </div>

      {/* Boleto Gerado */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Boleto Gerado com Sucesso!
          </h3>
          <p className="text-gray-600">
            Você pode pagar em qualquer banco, lotérica ou app bancário
          </p>
        </div>

        {/* Valor */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Valor do boleto</p>
          <p className="text-3xl font-bold text-[#00a82d]">
            R$ {amount.toFixed(2)}
          </p>
        </div>

        {/* Código de Barras */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Código de barras
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
              value={barcodeNumber}
              readOnly
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copiar
            </button>
          </div>
        </div>

        {/* Botão de Download */}
        <button
          onClick={handleDownload}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 mb-4"
        >
          <Download className="w-5 h-5" />
          Baixar Boleto (PDF)
        </button>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-900 mb-3">Como pagar o boleto:</h4>
        <ol className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Baixe o boleto em PDF ou copie o código de barras</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>Pague em qualquer banco, lotérica ou app bancário</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>Aguarde a compensação (até 2 dias úteis)</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Seu domínio será registrado automaticamente após a confirmação</span>
          </li>
        </ol>
      </div>

      {/* Alerta */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Atenção:</p>
            <p>
              O registro do domínio será concluído apenas após a compensação do boleto. 
              Certifique-se de pagar dentro do prazo de vencimento.
            </p>
          </div>
        </div>
      </div>

      {/* Botão de Confirmação */}
      <button
        onClick={handleConfirm}
        className="w-full px-6 py-4 bg-[#00a82d] text-white rounded-xl hover:bg-[#008c26] transition-colors font-semibold text-lg flex items-center justify-center gap-2"
      >
        <Check className="w-5 h-5" />
        Confirmar e Finalizar
      </button>

      <p className="text-xs text-center text-gray-500">
        Você receberá um email com o boleto e atualizações sobre o pagamento
      </p>
    </div>
  );
}
