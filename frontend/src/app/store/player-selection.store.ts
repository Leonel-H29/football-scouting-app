import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PlayerSelectionState {
  selectedPlayerIds: readonly string[];
  togglePlayerId: (playerId: string) => void;
  setSelectedPlayerIds: (playerIds: readonly string[]) => void;
  clearSelectedPlayerIds: () => void;
  removeSelectedPlayer: (playerId: string) => void;
  isPlayerSelected: (playerId: string) => boolean;
}

const MAX_SELECTED_PLAYERS = 3;
const STORAGE_KEY = 'scoutinglab.compare-selection';

const unique = (playerIds: readonly string[]): string[] => Array.from(new Set(playerIds));

export const usePlayerSelectionStore = create<PlayerSelectionState>()(
  persist(
    (set, get) => ({
      selectedPlayerIds: [],
      togglePlayerId: (playerId: string) => set((state) => {
        const exists = state.selectedPlayerIds.includes(playerId);
        const selectedPlayerIds = exists
          ? state.selectedPlayerIds.filter((item) => item !== playerId)
          : unique([...state.selectedPlayerIds, playerId]).slice(0, MAX_SELECTED_PLAYERS);
        return { selectedPlayerIds };
      }),
      setSelectedPlayerIds: (playerIds: readonly string[]) => set({ selectedPlayerIds: unique(playerIds).slice(0, MAX_SELECTED_PLAYERS) }),
      clearSelectedPlayerIds: () => set({ selectedPlayerIds: [] }),
      removeSelectedPlayer: (playerId: string) => set((state) => ({
        selectedPlayerIds: state.selectedPlayerIds.filter((item) => item !== playerId),
      })),
      isPlayerSelected: (playerId: string) => get().selectedPlayerIds.includes(playerId),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedPlayerIds: state.selectedPlayerIds }),
    },
  ),
);
