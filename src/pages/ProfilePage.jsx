import { useEffect, useState } from 'react'
import { BrainCircuit, CheckCircle2, Lightbulb, RefreshCw } from 'lucide-react'
import { extractRecommendations } from '../utils/finance'
import FinancialAnalysis from './FinancialAnalysis' // <-- Importa el nuevo componente

export default function ProfilePage({ profile, onRefresh, loading }) {
  const recs = extractRecommendations(profile)

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Análisis</span>
          <h1>Tu perfil financiero</h1>
          <p>Una lectura sencilla de tus hábitos basada en los movimientos registrados.</p>
        </div>
        <button className="secondary-button" onClick={onRefresh} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Analizando…' : 'Actualizar análisis'}
        </button>
      </div>

      {!profile ? (
        <div className="card profile-empty">
          <BrainCircuit size={40} />
          <h2>Aún no hay un análisis disponible</h2>
          <p>Registra varias transacciones y solicita el análisis para obtener un perfil financiero.</p>
          <button className="primary-button compact" onClick={onRefresh}>Generar análisis</button>
        </div>
      ) : (
        <div className="profile-grid space-y-6">
          {/* Reemplazamos la sección <pre> previa por el componente estructurado */}
          <div className="card raw-analysis p-6">
            <FinancialAnalysis data={profile} />
          </div>
        </div>
      )}
    </div>
  )
}