import gql from 'graphql-tag';

export const GET_LATEST_APP_VERSION = gql`
  query latestAppVersion($appName: String!, $platform: String!) {
    latestAppVersion(appName: $appName, platform: $platform) {
      hasEmailConfirmation
    }
  }
`;
