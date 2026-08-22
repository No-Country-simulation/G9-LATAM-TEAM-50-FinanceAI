export default function StatCard({ icon: Icon, label, value, hint, tone = 'default' }) {
  return <div className={`stat-card ${tone}`}><div className="stat-icon"><Icon size={19}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</div></div>
}
