import { IAuthenticationState } from './types/authentication';

export default class AppEntryPoint {
  public static getByAuthenticationState = (
    auth: IAuthenticationState,
  ): string => {
    let entryPoint = 'Logout';

    if (true === auth.authenticated) {
      entryPoint = 'App';

      if (auth.user && !auth.user.currentHouse) {
        entryPoint = 'HouseInit';
      }
    }

    return entryPoint;
  };
}
