export const storageKeys = {
  session: 'scoutinglab.session',
  user: 'scoutinglab.user',
  favorites: 'scoutinglab.favorites',
};

export const storage = {
  readString(key: string): string | null {
    return localStorage.getItem(key);
  },
  writeString(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
