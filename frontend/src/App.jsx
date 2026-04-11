import './App.css'
import Header from './components/header/Header'
import StatsCards from './components/statsCards/StatsCards'
import TicketTable from './components/ticketTable/TicketTable'


function App() {

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
        <StatsCards />
        <TicketTable />
      </main>
    </>
  )
}

export default App
