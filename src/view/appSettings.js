import createClient from './apolloClient';
import {GET_LATEST_APP_VERSION} from './appInfo';
import GET_CURRENT_CCM_CONSENT from './getCurrentCCMConsent';

export const queryLatestAppVersion = async dataSending => {
  const client = await createClient(false, false, true);
  const result = await client.query({
    query: GET_LATEST_APP_VERSION,
    variables: dataSending,
  });
  return result.data;
};

export const getCurrentCCMConsent = async () => {
  const client = await createClient();
  const result = await client.query({
    query: GET_CURRENT_CCM_CONSENT,
  });
  return result.data;
};
