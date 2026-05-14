import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', background: '#080808', color: '#f0ede8',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '2rem', fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#c8f135', marginBottom: '1rem', fontSize: '1.5rem' }}>
            ⚠ Runtime Error
          </h1>
          <pre style={{
            background: '#111', border: '1px solid #333', borderRadius: '8px',
            padding: '1.5rem', maxWidth: '800px', width: '100%',
            overflowX: 'auto', fontSize: '0.85rem', color: '#ef4444',
            whiteSpace: 'pre-wrap', wordBreak: 'break-word'
          }}>
            {this.state.error.toString()}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// StrictMode removed — it double-invokes effects in dev,
// exhausting the browser's WebGL context limit (max 16)
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
