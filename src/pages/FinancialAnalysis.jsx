import {
  Wallet,
  TrendingUp,
  PieChart,
  Repeat,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Target,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react'

const defaultData = {
  perfil_financiero: 'Constructor Estable',
  financial_score: 78,
  score_ahorro: 82,
  score_gasto: 65,
  score_diversificacion: 71,
  score_frecuencia: 88,
  categoria_principal: 'Vivienda y Servicios',
  porcentaje_categoria_principal: 34.5,
  recomendaciones: [
    'Destina un 5% adicional de tus ingresos a tu fondo de emergencia este trimestre.',
    'Diversifica tus gastos variables: hoy el 34% se concentra en una sola categoría.',
    'Mantén tu racha de aportes mensuales, es tu métrica más sólida.',
  ],
}

const metrics = [
  { key: 'score_ahorro', label: 'Ahorro', description: 'Capacidad de ahorro', icon: Wallet },
  { key: 'score_gasto', label: 'Gastos', description: 'Control de gastos', icon: TrendingUp },
  { key: 'score_diversificacion', label: 'Diversificación', description: 'Distribución financiera', icon: PieChart },
  { key: 'score_frecuencia', label: 'Frecuencia', description: 'Constancia de hábitos', icon: Repeat },
]

function getStatus(score) {
  if (score >= 85) return { label: 'Excelente', tone: 'green' }
  if (score >= 70) return { label: 'Saludable', tone: 'blue' }
  if (score >= 50) return { label: 'En desarrollo', tone: 'amber' }
  return { label: 'Necesita atención', tone: 'red' }
}

function getInterpretation(data) {
  const score = Number(data.financial_score || 0)
  const ahorro = Number(data.score_ahorro || 0)
  const gasto = Number(data.score_gasto || 0)
  const frecuencia = Number(data.score_frecuencia || 0)

  if (score >= 80) {
    return `Tu comportamiento financiero presenta una base sólida. ${
      frecuencia >= 80
        ? 'La constancia de tus hábitos es una de tus principales fortalezas.'
        : 'Tu capacidad de ahorro es una de tus principales fortalezas.'
    } El mayor espacio de mejora está en el control y distribución de tus gastos.`
  }

  if (score >= 65) {
    return `Tu situación financiera es estable y cuenta con una buena base para seguir mejorando. ${
      ahorro >= 75
        ? 'Tu capacidad de ahorro es un punto positivo.'
        : 'Conviene fortalecer progresivamente tu capacidad de ahorro.'
    } El principal objetivo debería ser mejorar el control de gastos y mantener hábitos consistentes.`
  }

  return 'Tu situación financiera presenta algunas áreas que requieren atención. Prioriza el control de gastos, fortalece tu capacidad de ahorro y establece hábitos financieros más consistentes.'
}

function ScoreRing({ score }) {
  const radius = 51
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference

  return (
    <div className="fa-score-ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} className="fa-score-track" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="fa-score-progress"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="fa-score-value">
        <strong>{score}</strong>
        <span>/ 100</span>
      </div>
    </div>
  )
}

function Metric({ item, value }) {
  const Icon = item.icon
  const score = Number(value || 0)
  const status = getStatus(score)

  return (
    <article className="fa-metric">
      <div className="fa-metric-top">
        <div className="fa-metric-icon">
          <Icon size={19} strokeWidth={2} />
        </div>

        <div className="fa-metric-copy">
          <strong>{item.label}</strong>
          <span>{item.description}</span>
        </div>

        <b>{score}</b>
      </div>

      <div className="fa-progress">
        <span className={`fa-progress-fill ${status.tone}`} style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }} />
      </div>

      <div className="fa-metric-footer">
        <span>Desempeño</span>
        <em className={status.tone}>{status.label}</em>
      </div>
    </article>
  )
}

export default function FinancialAnalysis({ data = defaultData }) {
  if (!data) return null

  const score = Number(data.financial_score || 0)
  const percentage = Number(data.porcentaje_categoria_principal || 0)
  const status = getStatus(score)

  return (
    <div className="financial-analysis">

      <style>{`
        .financial-analysis {
          --fa-navy: #142033;
          --fa-navy-2: #1c2b40;
          --fa-blue: #4778e6;
          --fa-green: #20a66a;
          --fa-text: #172235;
          --fa-muted: #738096;
          --fa-border: #e6eaf0;
          --fa-soft: #f7f9fc;
          width: calc(100% + 40px);
          margin: -20px;
          padding: 34px;
          color: var(--fa-text);
          background: #f5f7fa;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          border-radius: 17px;
        }

        .financial-analysis * { box-sizing: border-box; }

        .fa-heading {
          margin-bottom: 24px;
        }

        .fa-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #5d6b80;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .fa-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--fa-green);
          box-shadow: 0 0 0 4px #dff5ea;
        }

        .fa-heading h2 {
          margin: 7px 0 6px;
          color: var(--fa-text);
          font-size: 30px;
          line-height: 1.12;
          letter-spacing: -.035em;
        }

        .fa-heading p {
          max-width: 720px;
          margin: 0;
          color: var(--fa-muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .fa-summary {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 270px;
          min-height: 285px;
          overflow: hidden;
          background: white;
          border: 1px solid var(--fa-border);
          border-radius: 22px;
          box-shadow: 0 8px 30px rgba(23, 34, 53, .055);
        }

        .fa-summary-main {
          position: relative;
          padding: 30px 34px;
          overflow: hidden;
        }

        .fa-summary-main:after {
          content: "";
          position: absolute;
          width: 230px;
          height: 230px;
          right: -110px;
          top: -110px;
          border-radius: 50%;
          background: #eef4ff;
          pointer-events: none;
        }

        .fa-badge-row {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
        }

        .fa-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          background: #edf8f2;
          color: #168257;
          font-size: 10px;
          font-weight: 800;
        }

        .fa-complete {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #8993a3;
          font-size: 10px;
          font-weight: 600;
        }

        .fa-summary-main h3 {
          position: relative;
          z-index: 1;
          margin: 21px 0 8px;
          font-size: 29px;
          line-height: 1.15;
          letter-spacing: -.035em;
        }

        .fa-summary-description {
          position: relative;
          z-index: 1;
          max-width: 650px;
          margin: 0;
          color: var(--fa-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .fa-summary-facts {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .fa-fact {
          min-width: 120px;
          padding: 10px 13px;
          background: #f8fafc;
          border: 1px solid #edf0f4;
          border-radius: 11px;
        }

        .fa-fact span {
          display: block;
          color: #8b95a5;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .fa-fact strong {
          display: block;
          margin-top: 3px;
          color: var(--fa-text);
          font-size: 12px;
        }

        .fa-status-green { color: #15925c !important; }
        .fa-status-blue { color: #4778e6 !important; }
        .fa-status-amber { color: #b27a10 !important; }
        .fa-status-red { color: #c94d55 !important; }

        .fa-score-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #16263a 0%, #101d2e 100%);
          color: white;
          padding: 24px;
        }

        .fa-score-label {
          margin-bottom: 10px;
          color: #9eacc0;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .12em;
        }

        .fa-score-ring {
          position: relative;
          width: 154px;
          height: 154px;
        }

        .fa-score-ring svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .fa-score-track,
        .fa-score-progress {
          fill: none;
          stroke-width: 8;
        }

        .fa-score-track {
          stroke: rgba(255,255,255,.1);
        }

        .fa-score-progress {
          stroke: #38c982;
          stroke-linecap: round;
          transition: stroke-dashoffset .8s ease;
        }

        .fa-score-value {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .fa-score-value strong {
          font-size: 40px;
          line-height: 1;
          letter-spacing: -.05em;
        }

        .fa-score-value span {
          margin-top: 5px;
          color: #8998ad;
          font-size: 10px;
        }

        .fa-score-status {
          margin-top: 5px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(56,201,130,.12);
          color: #55d99a;
          font-size: 10px;
          font-weight: 800;
        }

        .fa-section {
          margin-top: 28px;
        }

        .fa-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 13px;
        }

        .fa-section-kicker {
          margin: 0 0 4px;
          color: #8a95a6;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .11em;
        }

        .fa-section-head h3 {
          margin: 0;
          color: var(--fa-text);
          font-size: 19px;
          letter-spacing: -.025em;
        }

        .fa-section-note {
          color: #9aa3b1;
          font-size: 10px;
        }

        .fa-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .fa-metric {
          padding: 17px 18px;
          background: white;
          border: 1px solid var(--fa-border);
          border-radius: 15px;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .fa-metric:hover {
          transform: translateY(-2px);
          border-color: #d8dee8;
          box-shadow: 0 8px 22px rgba(23,34,53,.055);
        }

        .fa-metric-top {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .fa-metric-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          border-radius: 10px;
          background: #f1f5fb;
          color: #53637a;
        }

        .fa-metric-copy {
          min-width: 0;
          flex: 1;
        }

        .fa-metric-copy strong,
        .fa-metric-copy span {
          display: block;
        }

        .fa-metric-copy strong {
          color: var(--fa-text);
          font-size: 12px;
        }

        .fa-metric-copy span {
          margin-top: 2px;
          color: #929baa;
          font-size: 9px;
        }

        .fa-metric-top > b {
          color: var(--fa-text);
          font-size: 21px;
          letter-spacing: -.04em;
        }

        .fa-progress {
          height: 6px;
          margin-top: 15px;
          overflow: hidden;
          border-radius: 999px;
          background: #edf0f4;
        }

        .fa-progress-fill {
          display: block;
          height: 100%;
          border-radius: inherit;
          transition: width .8s ease;
        }

        .fa-progress-fill.green { background: #27ae70; }
        .fa-progress-fill.blue { background: #4b7ce6; }
        .fa-progress-fill.amber { background: #d39a27; }
        .fa-progress-fill.red { background: #d65b62; }

        .fa-metric-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }

        .fa-metric-footer span {
          color: #9aa3b1;
          font-size: 9px;
        }

        .fa-metric-footer em {
          font-size: 9px;
          font-style: normal;
          font-weight: 800;
        }

        .fa-metric-footer em.green { color: #15925c; }
        .fa-metric-footer em.blue { color: #4778e6; }
        .fa-metric-footer em.amber { color: #b27a10; }
        .fa-metric-footer em.red { color: #c94d55; }

        .fa-insight {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: start;
          padding: 21px 23px;
          background: #142033;
          border-radius: 17px;
          color: white;
        }

        .fa-insight-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: rgba(255,255,255,.08);
          color: #f4c95d;
        }

        .fa-insight-kicker {
          margin: 0;
          color: #8392a8;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .11em;
        }

        .fa-insight h3 {
          margin: 4px 0 5px;
          color: white;
          font-size: 16px;
        }

        .fa-insight p {
          margin: 0;
          max-width: 800px;
          color: #b8c2d0;
          font-size: 11px;
          line-height: 1.65;
        }

        .fa-category {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 120px;
          gap: 28px;
          align-items: center;
          padding: 23px;
          background: white;
          border: 1px solid var(--fa-border);
          border-radius: 17px;
        }

        .fa-category-title {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .fa-category-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #edf4ff;
          color: #4c7be0;
        }

        .fa-category-kicker {
          margin: 0;
          color: #8b95a5;
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .1em;
        }

        .fa-category h3 {
          margin: 4px 0 0;
          color: var(--fa-text);
          font-size: 18px;
        }

        .fa-category-number {
          text-align: right;
        }

        .fa-category-number strong {
          color: var(--fa-text);
          font-size: 28px;
          letter-spacing: -.04em;
        }

        .fa-category-number span {
          display: block;
          margin-top: 2px;
          color: #929baa;
          font-size: 9px;
        }

        .fa-category-bar {
          height: 8px;
          margin-top: 19px;
          overflow: hidden;
          border-radius: 999px;
          background: #edf0f4;
        }

        .fa-category-bar span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #4778e6, #6d9af3);
        }

        .fa-category-description {
          margin: 10px 0 0;
          color: #7b8697;
          font-size: 10px;
          line-height: 1.55;
        }

        .fa-category-visual {
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          margin: auto;
          border-radius: 50%;
          background: conic-gradient(#4778e6 ${Math.min(Math.max(percentage, 0), 100)}%, #e9eef5 0);
        }

        .fa-category-visual-inner {
          width: 82px;
          height: 82px;
          display: grid;
          place-items: center;
          text-align: center;
          border-radius: 50%;
          background: white;
        }

        .fa-category-visual-inner strong {
          display: block;
          color: #4778e6;
          font-size: 20px;
        }

        .fa-category-visual-inner span {
          display: block;
          margin-top: 1px;
          color: #99a2b0;
          font-size: 8px;
          text-transform: uppercase;
        }

        .fa-recommendations {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #dfe4eb;
        }

        .fa-recommendation-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 17px;
        }

        .fa-recommendation-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #168257;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .11em;
        }

        .fa-recommendation-label i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #20a66a;
        }

        .fa-recommendation-heading h3 {
          margin: 6px 0 4px;
          color: var(--fa-text);
          font-size: 24px;
          letter-spacing: -.035em;
        }

        .fa-recommendation-heading p {
          margin: 0;
          color: #7d8798;
          font-size: 11px;
        }

        .fa-recommendation-count {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #929baa;
          font-size: 9px;
          white-space: nowrap;
        }

        .fa-recommendation-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .fa-recommendation {
          min-height: 185px;
          display: flex;
          flex-direction: column;
          padding: 19px;
          background: white;
          border: 1px solid var(--fa-border);
          border-radius: 15px;
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .fa-recommendation:hover {
          transform: translateY(-2px);
          border-color: #cde9dc;
          box-shadow: 0 8px 22px rgba(23,34,53,.055);
        }

        .fa-recommendation-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .fa-recommendation-icon {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #ecf8f2;
          color: #15925c;
        }

        .fa-recommendation-number {
          color: #c4cad3;
          font-size: 10px;
          font-weight: 900;
        }

        .fa-recommendation h4 {
          margin: 17px 0 5px;
          color: var(--fa-text);
          font-size: 12px;
        }

        .fa-recommendation p {
          flex: 1;
          margin: 0;
          color: #737f91;
          font-size: 10px;
          line-height: 1.65;
        }

        .fa-recommendation-priority {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 14px;
          color: #15925c;
          font-size: 9px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .financial-analysis {
            width: calc(100% + 40px);
            margin: -20px;
            padding: 25px;
          }

          .fa-summary {
            grid-template-columns: 1fr;
          }

          .fa-score-panel {
            min-height: 235px;
          }

          .fa-recommendation-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .financial-analysis {
            width: calc(100% + 32px);
            margin: -16px;
            padding: 20px 16px;
          }

          .fa-heading h2 {
            font-size: 26px;
          }

          .fa-summary-main {
            padding: 24px 20px;
          }

          .fa-summary-main h3 {
            font-size: 25px;
          }

          .fa-metrics {
            grid-template-columns: 1fr;
          }

          .fa-category {
            grid-template-columns: 1fr;
          }

          .fa-category-number {
            text-align: left;
            margin-top: 14px;
          }

          .fa-category-visual {
            display: none;
          }

          .fa-section-head,
          .fa-recommendation-heading {
            align-items: start;
            flex-direction: column;
          }
        }
      `}</style>

      <header className="fa-heading">
        <div className="fa-eyebrow">
          <span className="fa-eyebrow-dot" />
          Análisis financiero
        </div>

        <h2>Tu salud financiera</h2>

        <p>
          Una lectura integral de tus hábitos de ahorro, gasto,
          diversificación y constancia para entender mejor tu
          comportamiento financiero.
        </p>
      </header>

      <section className="fa-summary">
        <div className="fa-summary-main">
          <div className="fa-badge-row">
            <span className="fa-badge">
              <ShieldCheck size={13} />
              Perfil financiero
            </span>

            <span className="fa-complete">
              <CheckCircle2 size={13} />
              Análisis completado
            </span>
          </div>

          <h3>{data.perfil_financiero || 'Perfil General'}</h3>

          <p className="fa-summary-description">
            Tu perfil refleja la forma en que estás administrando
            actualmente tus recursos. El resultado combina cuatro
            indicadores para ofrecer una visión rápida de tus
            fortalezas y de las áreas que merecen mayor atención.
          </p>

          <div className="fa-summary-facts">
            <div className="fa-fact">
              <span>Estado actual</span>
              <strong className={`fa-status-${status.tone}`}>
                {status.label}
              </strong>
            </div>

            <div className="fa-fact">
              <span>Indicadores</span>
              <strong>4 evaluados</strong>
            </div>

            <div className="fa-fact">
              <span>Principal gasto</span>
              <strong>{data.categoria_principal || 'Sin registrar'}</strong>
            </div>
          </div>
        </div>

        <div className="fa-score-panel">
          <span className="fa-score-label">Score financiero</span>
          <ScoreRing score={score} />
          <span className="fa-score-status">{status.label}</span>
        </div>
      </section>

      <section className="fa-section">
        <div className="fa-section-head">
          <div>
            <p className="fa-section-kicker">Evaluación</p>
            <h3>Indicadores financieros</h3>
          </div>

          <span className="fa-section-note">Escala de 0 a 100</span>
        </div>

        <div className="fa-metrics">
          {metrics.map((item) => (
            <Metric
              key={item.key}
              item={item}
              value={data[item.key]}
            />
          ))}
        </div>
      </section>

      <section className="fa-section">
        <div className="fa-insight">
          <div className="fa-insight-icon">
            <Lightbulb size={19} />
          </div>

          <div>
            <p className="fa-insight-kicker">Lectura del análisis</p>
            <h3>¿Qué significa tu resultado?</h3>
            <p>{getInterpretation(data)}</p>
          </div>
        </div>
      </section>

      <section className="fa-section">
        <div className="fa-section-head">
          <div>
            <p className="fa-section-kicker">Distribución</p>
            <h3>¿Dónde se concentra tu dinero?</h3>
          </div>
        </div>

        <div className="fa-category">
          <div>
            <div className="fa-category-title">
              <div className="fa-category-icon">
                <PieChart size={19} />
              </div>

              <div>
                <p className="fa-category-kicker">Categoría principal de gasto</p>
                <h3>{data.categoria_principal || 'Sin registrar'}</h3>
              </div>
            </div>

            <div className="fa-category-bar">
              <span style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }} />
            </div>

            <p className="fa-category-description">
              Esta categoría representa la mayor proporción de tus
              gastos registrados. Vigilar su evolución puede ayudarte
              a encontrar oportunidades de ahorro.
            </p>
          </div>

          <div className="fa-category-number">
            <strong>{percentage.toFixed(1)}%</strong>
            <span>del gasto total</span>
          </div>

          <div className="fa-category-visual">
            <div className="fa-category-visual-inner">
              <div>
                <strong>{percentage.toFixed(0)}%</strong>
                <span>participación</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Array.isArray(data.recomendaciones) && data.recomendaciones.length > 0 && (
        <section className="fa-recommendations">
          <div className="fa-recommendation-heading">
            <div>
              <div className="fa-recommendation-label">
                <i />
                Próximos pasos
              </div>

              <h3>Recomendaciones para ti</h3>

              <p>
                Acciones concretas basadas en los patrones detectados
                en tu comportamiento financiero.
              </p>
            </div>

            <div className="fa-recommendation-count">
              <Target size={13} />
              {data.recomendaciones.length} acciones sugeridas
            </div>
          </div>

          <div className="fa-recommendation-grid">
            {data.recomendaciones.map((recommendation, index) => (
              <article className="fa-recommendation" key={index}>
                <div className="fa-recommendation-top">
                  <div className="fa-recommendation-icon">
                    {index === 1 ? (
                      <AlertTriangle size={18} />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </div>

                  <span className="fa-recommendation-number">
                    0{index + 1}
                  </span>
                </div>

                <h4>
                  {index === 0
                    ? 'Fortalece tu ahorro'
                    : index === 1
                      ? 'Mejora la distribución'
                      : 'Mantén el hábito'}
                </h4>

                <p>{recommendation}</p>

                <div className="fa-recommendation-priority">
                  <ArrowUpRight size={12} />
                  Acción recomendada
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
