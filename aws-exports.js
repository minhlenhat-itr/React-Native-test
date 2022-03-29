import {openURLInApp} from './src/services/amplify';

const awsmobile = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id:
    'us-east-2:75b892cd-6e8b-4aa4-858d-c7141980437f',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_c5ETWFh5W',
  aws_user_pools_web_client_id: '23c0b2ev33nr664licvdfsbfv9',
  oauth: {
    domain: 'btcy-acc-staging.auth.us-east-2.amazoncognito.com',
    scope: [
      'aws.cognito.signin.user.admin',
      'email',
      'openid',
      'phone',
      'profile',
    ],
    redirectSignIn: 'biocarecardiac://',
    redirectSignOut: 'biocarecardiac://',
    responseType: 'code',
    options: {
      // urlOpener: openURLInApp,
    },
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_mobile_analytics_app_id: '90e74b7dac294e87a5d53ccfa6976191',
  aws_mobile_analytics_app_region: 'us-east-1',
  aws_user_files_s3_bucket: 'biocare-cardiac-user-files170212-staging',
  aws_user_files_s3_bucket_region: 'us-east-2',
};

export default awsmobile;
