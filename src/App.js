import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Cards from './components/Cards/Cards';
import Form from './components/Form/Form';

function App() {
  const [token, setToken] = useState(null);
  const [cards, setCards] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
      const data = await response.json();

      setToken(data.token);
    }

    fetchToken();
    fetchCards();
  }, []);

  async function fetchCards() {
    setLoading(true);

    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6');
    const cards = await response.json();

    setCards(cards.users);
    setTotalPages(cards.total_pages);
    setCurrentPage(cards.page);
    setLoading(false);
  }

  async function showMoreClickHandler() {
    setLoading(true);

    const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage + 1}&count=6`);
    const cards = await response.json();

    setCards((prevCards => [...prevCards, ...cards.users]));
    setTotalPages(cards.total_pages);
    setCurrentPage(cards.page);
    setLoading(false);
  }

  return (
    <div>
      <Header/>
      <Main/>
      <div className="container">
        <Cards
          cards={cards}
          totalPages={totalPages}
          currentPage={currentPage}
          loading={loading}
          showMore={showMoreClickHandler}
        />
        <Form token={token} fetchCards={fetchCards}/>
      </div>
    </div>
  );
}

export default App;
