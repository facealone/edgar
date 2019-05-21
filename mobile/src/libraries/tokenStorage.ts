import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = 'edgar_majordome_token';

export class TokenStorage {
  public static save = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  };

  public static get = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  };

  public static remove = async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
  };
}
