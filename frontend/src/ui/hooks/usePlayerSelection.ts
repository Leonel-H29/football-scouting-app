import { usePlayerSelectionStore } from '@/app/store/player-selection.store';

export const usePlayerSelection = () => {
  const selectedPlayerIds = usePlayerSelectionStore((state) => state.selectedPlayerIds);
  const togglePlayerId = usePlayerSelectionStore((state) => state.togglePlayerId);
  const setSelectedPlayerIds = usePlayerSelectionStore((state) => state.setSelectedPlayerIds);
  const clearSelectedPlayerIds = usePlayerSelectionStore((state) => state.clearSelectedPlayerIds);
  const removeSelectedPlayer = usePlayerSelectionStore((state) => state.removeSelectedPlayer);
  const isPlayerSelected = usePlayerSelectionStore((state) => state.isPlayerSelected);

  return {
    selectedPlayerIds,
    togglePlayerId,
    setSelectedPlayerIds,
    clearSelectedPlayerIds,
    removeSelectedPlayer,
    isPlayerSelected,
  };
};
