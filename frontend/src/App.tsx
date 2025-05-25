import Hero from './ui/Hero'
import Nftcard from './ui/Nftcard'
import Container from './ui/Container'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <Container className="grid grid-cols-4 gap-4">
        {[...Array(20)].map((_, index) => (
          <Nftcard key={index} />
        ))}
      </Container>
    </>
  )
}

export default App
