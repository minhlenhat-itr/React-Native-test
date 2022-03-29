// import {openURLInApp} from './src/services/amplify';

const awsmobileDev = {
  aws_project_region: 'us-east-2',
  aws_cognito_identity_pool_id:
    'us-east-2:be7e4e95-33c6-4988-8b3c-98c623ccc9ca',
  aws_cognito_region: 'us-east-2',
  aws_user_pools_id: 'us-east-2_AgI9xBSrT',
  aws_user_pools_web_client_id: '2sf8accatmnurlo72uths7ccje',
  oauth: {
    domain: 'biocare-alpha.auth.us-east-2.amazoncognito.com',
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
  aws_mobile_analytics_app_id: '961fdb61672a4684b06552d0974bd944',
  aws_mobile_analytics_app_region: 'us-east-1',
  aws_user_files_s3_bucket: 'biocare-cardiac-user-files183955-alpha',
  aws_user_files_s3_bucket_region: 'us-east-2',
};

export default awsmobileDev;
