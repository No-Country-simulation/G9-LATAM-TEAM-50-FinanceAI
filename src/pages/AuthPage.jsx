import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import Logo from '../components/Logo'

export default function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ nombreCompleto:'', documento:'', edad:'', correo:'', contrasena:'' })

  const submit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = mode === 'login'
        ? { correo: form.correo, contrasena: form.contrasena }
        : { ...form, edad: Number(form.edad) }
      const result = await onAuthenticated(mode, payload)
      if (result?.error) setError(result.error)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return <div className="auth-shell"><div className="auth-visual"><Logo/><div className="hero-copy"><span className="eyebrow"><Sparkles size={15}/> Finanzas personales con IA</span><h1>Entiende tu dinero.<br/><em>Toma mejores decisiones.</em></h1><p>CapitaXYZ convierte tus movimientos financieros en señales claras, hábitos visibles y recomendaciones fáciles de aplicar.</p><div className="feature-row"><div><TrendingUp size={18}/><span>Seguimiento</span></div><div><ShieldCheck size={18}/><span>Privacidad</span></div></div></div></div><div className="auth-panel"><div className="auth-card"><div className="auth-tabs"><button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setError('')}}>Iniciar sesión</button><button className={mode==='register'?'active':''} onClick={()=>{setMode('register');setError('')}}>Crear cuenta</button></div><div className="auth-title"><h2>{mode==='login'?'Bienvenido de vuelta':'Empieza a ordenar tus finanzas'}</h2><p>{mode==='login'?'Accede a tu panel financiero.':'Configura tu cuenta en menos de un minuto.'}</p></div><form onSubmit={submit} className="form-stack">{mode==='register' && <><label>Nombre completo<input value={form.nombreCompleto} onChange={e=>setForm({...form,nombreCompleto:e.target.value})} required minLength={5}/></label><div className="form-grid"><label>Documento<input value={form.documento} onChange={e=>setForm({...form,documento:e.target.value.replace(/\D/g,'')})} required/></label><label>Edad<input type="number" min="18" max="120" value={form.edad} onChange={e=>setForm({...form,edad:e.target.value})} required/></label></div></>}<label>Correo<input type="email" autoComplete="email" value={form.correo} onChange={e=>setForm({...form,correo:e.target.value})} required/></label><label>Contraseña<div className="password-wrap"><input type={showPassword?'text':'password'} autoComplete={mode==='login'?'current-password':'new-password'} value={form.contrasena} onChange={e=>setForm({...form,contrasena:e.target.value})} required minLength={8}/><button type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>{error && <div className="form-error">{error}</div>}<button className="primary-button" disabled={loading}>{loading?'Conectando…':mode==='login'?'Entrar al dashboard':'Crear mi cuenta'} <ArrowRight size={18}/></button></form><p className="legal">Al continuar aceptas usar CapitaXYZ como herramienta informativa de apoyo a tus decisiones financieras.</p></div></div></div>
}
