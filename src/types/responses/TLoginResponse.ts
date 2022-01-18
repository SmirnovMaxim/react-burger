import {TUserStore} from '../stores';

type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUserStore;
}

export default TLoginResponse;
