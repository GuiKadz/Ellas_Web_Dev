import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-zinc-900 text-white">
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className="text-accent-foreground text-xl">
        Volte para o{' '}
        <Link className="text-purple-700" to="/">
          Sistema Ellas
        </Link>
        .
      </p>
    </div>
  )
}