import { FavoritePlayersRepository } from '@/domain/ports/player.port';
import { storage, storageKeys } from '@/infrastructure/storage/local-storage';

const readJson = <T>(raw: string | null, fallback: T): T => {
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const readFavorites = (): string[] => readJson(storage.readString(storageKeys.favorites), []);
const writeFavorites = (favorites: string[]): void => {
  storage.writeString(storageKeys.favorites, JSON.stringify(favorites));
};

export class LocalFavoritesRepository implements FavoritePlayersRepository {
  list(): readonly string[] {
    return readFavorites();
  }

  toggle(playerId: string): readonly string[] {
    const favorites = readFavorites();
    const next = favorites.includes(playerId)
      ? favorites.filter((item) => item !== playerId)
      : [playerId, ...favorites];
    writeFavorites(next);
    return next;
  }

  isFavorite(playerId: string): boolean {
    return readFavorites().includes(playerId);
  }
}
