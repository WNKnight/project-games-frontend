import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchGamesPage } from '../utils/RawgApi';
import Preloader from './Preloader';
import GameGrid from './GameGrid';

function Catalog() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);

const loadMoreGames = useCallback(async () => {
  if (loading || !hasMore) return;

  try {
    setLoading(true);

    const data = await fetchGamesPage(page);

    setGames((prev) => [...prev, ...data.games]);
    setPage((prev) => prev + 1);

    if (!data.next) {
      setHasMore(false);
    }

    setError(null);
  } catch (err) {
    setError('Error loading more games.');
  } finally {
    setLoading(false);
  }
}, [page, loading, hasMore]);

useEffect(() => {
  loadMoreGames();
}, [loadMoreGames]);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreGames();
    }
  });

  if (observerRef.current) {
    observer.observe(observerRef.current);
  }

  return () => observer.disconnect();
}, [loadMoreGames]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='catalog'>
      <h2 className="catalog__title">Game Catalog</h2>

      <GameGrid games={games} />

      {loading && <Preloader />}

      <div ref={observerRef} style={{ height: '20px' }} />

      {!hasMore && <p style={{ textAlign: 'center' }}>No more games</p>}
    </div>
  );
}

export default Catalog;