import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import _ from 'lodash';
import Auth from '@aws-amplify/auth';

// import {AppFlowActions} from '../../global/appFlow';
import {Platform} from 'react-native';
import {getVersion} from 'react-native-device-info';
import emitter from '../utils/hooks/emitter';

const cache = new InMemoryCache({addTypename: false});
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const createHeader = async (isGuest, guestToken) => {
  // let authLink;
  if (isGuest) {
    if (guestToken) {
      return setContext((_, {headers}) => ({
        headers: {...headers, 'guest-token': guestToken},
      }));
    }
    return setContext((_, {headers}) => ({
      headers: {...headers},
    }));
  } else {
    // try {
    //   const cognitoUser = await Auth.currentAuthenticatedUser();
    //   const currentSession = cognitoUser.signInUserSession;
    //   cognitoUser.refreshSession(
    //     currentSession.refreshToken,
    //     (err, session) => {
    //       // do something with the new session
    //       console.log('new token: ', session.accessToken.jwtToken);
    //       return setContext((_, {headers}) => ({
    //         headers: {...headers, 'access-token': session.accessToken.jwtToken},
    //       }));
    //     },
    //   );
    // } catch (e) {
    //   // whatever
    // }

    const currentSession = await Auth.currentSession();
    // .then(session => {})
    // .catch(error => {
    //   console.log('error currentSession: ', error);
    // });
    const token = currentSession.accessToken.jwtToken;
    const refreshToken = currentSession.getRefreshToken();
    console.log('The refreshToken: ', refreshToken);
    console.log('The token: ', token);
    return setContext((_, {headers}) => ({
      headers: {...headers, 'access-token': token},
    }));
  }
};

const createClient = async (
  isUsingCache = false,
  isNotShowDisconnect = false,
  isGuest = false,
  guestToken = '',
) => {
  console.log('isUsingCache', isUsingCache, isNotShowDisconnect);
  try {
    const authLink = await createHeader(isGuest, guestToken);
    const name =
      Platform.OS === 'ios' ? 'biocare-cardiac-ios' : 'biocare-cardiac-android';
    const version = getVersion();
    return new ApolloClient({
      link: authLink.concat(
        ApolloLink.from([
          onError(
            ({graphQLErrors, networkError, response, operation, forward}) => {
              console.log({
                graphQLErrors,
                networkError,
                response,
                forward,
              });
              if (graphQLErrors) {
                console.log({graphQLErrors});
                graphQLErrors.map(({message, extensions}) => {
                  if (
                    _.includes(message, '403') ||
                    _.includes(message, '400') ||
                    extensions.code === 'UNAUTHENTICATED'
                  ) {
                    // TODO: Go to Login screen, clear data
                    // emitter.emit(AppFlowActions.LOGOUT_REQUEST, 'request');
                    if (extensions.code === 'UNAUTHENTICATED') {
                      // emitter.emit(AppFlowActions.GUEST_TOKEN_EXPIRED);
                    }
                  }
                  if (extensions.code === 'USER_IS_DISABLED') {
                    // emitter.emit('USER_IS_DISABLED', message);
                    // emitter.emit(AppFlowActions.LOGOUT_REQUEST, 'request');
                  }
                });
              }
              if (networkError) {
                console.log(`[Network error]: ${networkError}`);
                // toastrError('Network error', 'Please check your network and try again');
                if (!isNotShowDisconnect) {
                  // openPopupDisconnect();
                }
              }
            },
          ),
          new HttpLink({
            uri: 'https://gateway.alpha.cardiac.bioflux.io/',
            credentials: 'same-origin',
          }),
        ]),
      ),
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
      name,
      version,
    });
  } catch (error) {
    // Toast.show(error, Toast.LONG);
    console.log('errrror: ', error);
    if (error === 'No current user') {
      // emitter.emit(AppFlowActions.LOGOUT_REQUEST, 'request');
    }
    return null;
  }
};

export default createClient;

export const resetStore = async () => {
  const client = await createClient();
  return client.resetStore();
};
