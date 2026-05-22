import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchGamesPage } from '../utils/RawgApi';
import Preloader from './Preloader';
import GameGrid from './GameGrid';

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadMoreGames = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const currentPage = pageRef.current;
      const data = await fetchGamesPage(currentPage);

      setGames((prevGames) => {
        const existingIds = new Set(prevGames.map((game) => game.id));
        const uniqueNewGames = data.games.filter((game) => !existingIds.has(game.id));
        return [...prevGames, ...uniqueNewGames];
      });

      pageRef.current = currentPage + 1;

      const moreAvailable = Boolean(data.next);
      hasMoreRef.current = moreAvailable;
      setHasMore(moreAvailable);

      setError(null);
    } catch (err) {
      setError('Error loading more games.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMoreGames();
  }, [loadMoreGames]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreGames();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    const currentObserver = observerRef.current;

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
      observer.disconnect();
    };
  }, [loadMoreGames]);

  if (error) {
    return <div className="catalog__message catalog__message--error">{error}</div>;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title">Game Catalog</h2>

      <GameGrid games={games} />

      {loading && <Preloader />}

      <div ref={observerRef} className="catalog__sentinel" />

      {!hasMore && (
        <p className="catalog__message catalog__message--end">
          No more games
        </p>
      )}
    </section>
  );
}

export default Catalog;