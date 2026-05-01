import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORAGE_KEY = 'scoutinglab.favorites';

interface FavoritePlayersState {
  favoritePlayerIds: string[];
  toggleFavoritePlayer: (playerId: string) => void;
  removeFavoritePlayer: (playerId: string) => void;
  clearFavoritePlayers: () => void;
  isFavoritePlayer: (playerId: string) => boolean;
}

export const useFavoritesStore = create<FavoritePlayersState>()(
  persist(
    (set, get) => ({
      favoritePlayerIds: [],
      toggleFavoritePlayer: (playerId) => set((state) => ({
        favoritePlayerIds: state.favoritePlayerIds.includes(playerId)
          ? state.favoritePlayerIds.filter((id) => id !== playerId)
          : [playerId, ...state.favoritePlayerIds],
      })),
      removeFavoritePlayer: (playerId) => set((state) => ({
        favoritePlayerIds: state.favoritePlayerIds.filter((id) => id !== playerId),
      })),
      clearFavoritePlayers: () => set({ favoritePlayerIds: [] }),
      isFavoritePlayer: (playerId) => get().favoritePlayerIds.includes(playerId),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
