export default function BarChart({ data }) {
  const max = Math.max(...data.flatMap(d => [d.ingresos, d.gastos]), 1)
  return <div className="bar-chart">{data.map((d, i) => <div className="bar-group" key={`${d.label}-${i}`}><div className="bars"><div className="bar income" style={{ height: `${Math.max(5, d.ingresos/max*140)}px` }} title={`Ingresos: ${d.ingresos}`}/><div className="bar expense" style={{ height: `${Math.max(5, d.gastos/max*140)}px` }} title={`Gastos: ${d.gastos}`}/></div><span>{d.label}</span></div>)}</div>
}
