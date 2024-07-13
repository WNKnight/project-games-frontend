import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCatalogGames, fetchTotalGamesCount } from '../utils/GameBombApi';
import Preloader from './Preloader';
import GameGrid from './GameGrid';
import Pagination from './Pagination';

function Catalog() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [sortBy, setSortBy] = useState('asc');
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const totalGamesCount = await fetchTotalGamesCount();
        const fetchedGames = await fetchCatalogGames(itemsPerPage, (currentPage - 1) * itemsPerPage, sortBy);
        
        if (fetchedGames.length === 0 && currentPage > 1) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }

        setGames(fetchedGames);
        setTotalPages(Math.ceil(totalGamesCount / itemsPerPage));
        setError(null);
      } catch (err) {
        setError('Erro ao buscar jogos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, [itemsPerPage, currentPage, sortBy]);

  const handleChangeSortOrder = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const handleChangeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    navigate(`/catalog/1`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/catalog/${pageNumber}`);
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (notFound) {
    return <div>Nada Encontrado</div>;
  }

  return (
    <div className='catalog'>
      <h2 className="catalog__title">Game Catalog</h2>
      <div className='catalog__order'>
        <label className="catalog__order-block">
        Order by:
          <select value={sortBy} onChange={handleChangeSortOrder}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
        <label className="catalog__order-block">
        Items per page:
          <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
      <GameGrid games={games} />
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Catalog;