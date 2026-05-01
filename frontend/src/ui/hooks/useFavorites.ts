
import { useFavoritesStore } from '@/app/store/favorites.store';

export const useFavorites = () => {
  const favorites = useFavoritesStore((state) => state.favoritePlayerIds);
  const toggle = useFavoritesStore((state) => state.toggleFavoritePlayer);
  const remove = useFavoritesStore((state) => state.removeFavoritePlayer);
  const clear = useFavoritesStore((state) => state.clearFavoritePlayers);
  const isFavorite = useFavoritesStore((state) => state.isFavoritePlayer);

  return { favorites, toggle, remove, clear, isFavorite };
};
