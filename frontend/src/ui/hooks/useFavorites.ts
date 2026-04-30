import { useMemo, useState } from 'react';
import { useDependencies } from '@/app/providers/AppProviders';

export const useFavorites = () => {
  const { favoritesRepository } = useDependencies();
  const [favorites, setFavorites] = useState<readonly string[]>(favoritesRepository.list());

  const toggle = (playerId: string) => {
    setFavorites(favoritesRepository.toggle(playerId));
  };

  const isFavorite = useMemo(() => (playerId: string) => favorites.includes(playerId), [favorites]);

  return { favorites, toggle, isFavorite };
};
