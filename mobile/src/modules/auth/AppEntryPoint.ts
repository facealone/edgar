import { IHouse } from '../house/models/House';

export default class AppEntryPoint {
  public static get = (
    authenticated: boolean,
    currentHouse: IHouse | null,
  ): string => {
    let entryPoint = 'Logout';

    if (true === authenticated) {
      entryPoint = 'App';

      if (!currentHouse) {
        entryPoint = 'HouseInit';
      }
    }

    return entryPoint;
  };
}
