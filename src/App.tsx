import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Portfolio } from './containers/Portfolio'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portfolio />
    </QueryClientProvider>
  )
}

export default App
