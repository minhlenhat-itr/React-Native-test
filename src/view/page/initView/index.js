import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import {useTheme} from 'react-native-themed-styles';
import themedStyles from './styles';
import {EnumRouteName} from '../../../constants';
import Auth from '@aws-amplify/auth';

import {
  CognitoUser,
  CognitoUserSession,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoAccessToken,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import {getCurrentCCMConsent, queryLatestAppVersion} from '../../appSettings';

const {UserInfoModule} = NativeModules;

const InitView = props => {
  const [styles, theme] = useTheme(themedStyles);
  const {navigation} = props;

  const data = {
    username: '71e9b221-f0ff-4def-943c-380d4b2ef293',
    pool: {
      userPoolId: 'us-east-2_AgI9xBSrT',
      clientId: '2sf8accatmnurlo72uths7ccje',
      client: {
        endpoint: 'https://cognito-idp.us-east-2.amazonaws.com/',
        fetchOptions: {},
      },
      advancedSecurityDataCollectionFlag: true,
    },
    Session: null,
    client: {
      endpoint: 'https://cognito-idp.us-east-2.amazonaws.com/',
      fetchOptions: {},
    },
    signInUserSession: {
      idToken: {
        jwtToken:
          'eyJraWQiOiJYZlJjRzg2dE8rOXZ3WGV3NjhtQW1VTVlUVHpDelNxaEZ4dW1MUGlwb3RJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3MWU5YjIyMS1mMGZmLTRkZWYtOTQzYy0zODBkNGIyZWYyOTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMjAxMS0xMi0xMyIsImdlbmRlciI6Ik1hbGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9BZ0k5eEJTclQiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzFlOWIyMjEtZjBmZi00ZGVmLTk0M2MtMzgwZDRiMmVmMjkzIiwiZ2l2ZW5fbmFtZSI6Ik1hbmgiLCJhdWQiOiIyc2Y4YWNjYXRtbnVybG83MnV0aHM3Y2NqZSIsImV2ZW50X2lkIjoiNGYyNThjZmYtZGUzZC00MDJlLWFiNGUtZGEwNTkxMjA3ZTQwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDk3NjA3MDUsImV4cCI6MTY0OTc2NDMwNSwiaWF0IjoxNjQ5NzYwNzA1LCJmYW1pbHlfbmFtZSI6IlRyYW4iLCJlbWFpbCI6Im1hbmh0cmFuQGl0cnZuLmNvbSJ9.bVxkLxyZ0GXIYFAVUWQe7-DKM-375mCSkmPgTwdu5qU7q66fy4ZOzr7EN8NMPW1SZuybYnYocZMIgWaoxZbSB6GFEW5uT4eOFmO3kgGVopT-63dn_LufckBHd471rbpK371tjzFyWoGtuGlYs4nqjSm5mDBNvnMu0D7OaD5k6t9Eqqqkx3yROs--CpDd_X0FvJPkJ5Wg4r2GL7fSW9O7nd41DY0szoOEyimoip0vGWTz61P02R4DTzf8nA1ARYBKlLCuwYkB0IYeHh3PS4bmMm2CfMc4p_6Chcbr8b4W6AXVciGq6c_hfEbQfLt8teG-SeCVTdCghm8AzM6ve-9xuA',
        payload: {
          sub: '71e9b221-f0ff-4def-943c-380d4b2ef293',
          email_verified: true,
          birthdate: '2011-12-13',
          gender: 'Male',
          iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AgI9xBSrT',
          'cognito:username': '71e9b221-f0ff-4def-943c-380d4b2ef293',
          given_name: 'Manh',
          aud: '2sf8accatmnurlo72uths7ccje',
          event_id: '4f258cff-de3d-402e-ab4e-da0591207e40',
          token_use: 'id',
          auth_time: 1649760705,
          exp: 1649764305,
          iat: 1649760705,
          family_name: 'Tran',
          email: 'manhtran@itrvn.com',
        },
      },
      refreshToken: {
        token:
          'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.BWaIH6rfNR5cAMrdXPNsLlxGUlxAaGLFMeeegzdJ-axVE0gNGkWy9gml2z2rfzUfjSDh0Xv9H9WF6Y0WrrtjQJMptHYR8ZEL0uowI6W95q58543TCHLAlZNQL_3nFYgYoOqjPDB_Xnc0MFUC0VSGGMZ_O5VHX1QPUVCOAE9PUaR50mozXnkBSIXLoxEbanM0FAK6IVggTkjbm0LNFNfkMHbSALy_NP-T7uqr0y8ZmIim44NKJU7lKjaCJXbKtwuD7XNkf5_4ikcihoKNNL16qWuMSNLZyPrRjDbG-3IyPbWGi89E4cjSsi4UNEYAH0TTK6X5-wJYpEPNH8Ox9GCYVg.Sdl2xrdzFhCg5FyE.WxKw5BVVZZB5iNc4q9Cu3EnhxxiM0TNVVR1eNEgcu9dqp9ravsqulrqEvEPjvd6i7e8VBmuLv-IKtwx5gtT1xyGn5KSjVXCbEfFx3yjQ8dCqRoZc3OMzA6gAiOEud2umohoclMQDrAmHU3YLQjidyYGxuJcyRNGRevTilMj9d2qB0VGymVUvwot98n8H4Dykx2UDJFJTYldH4b2bx3PPu6SkpwzlAr1vEgXELgt_8SV5lwfSwH6zhPYHcDM2883zecYHWyiA_kcYu6bgcrGGTCcPvUWUwlQ1I69cOpIHUGjD41jppTWodfPPpeI90N_BTNhTEbI4ZAgstlDfb2Dc_LKvSnhM9a4FN35WzWlWQ0yLitLihY2MFaYsFsEJhdv3LlX6HzXLbRRLmq9xiXSzMWvJxL28mgeX_NM_uY93SNdu__1sE1Qk60SXUgZ6agnQkZzuvJQaf8K1K7tjxI9H13SKiz6UITEC4shR0E7aZ3zdSftM7Tm5VpanLKYnkG5a4fDcToSoSusyz9G4ZBJsBuv9SXGLy_I9MnLKeEWcTnKvdsRbhlfreEv4OIHSlTouFUj82qjGFCU__Tm9YWPLNB0I4ZYELAGt-8yygqmtoCzz9NjEp9YaHu4W3PxNRPW5W1HNcKIsUG5nPuUSw__Iwl36k36Rsm41RFsREtcL7RKcIA6nurd-jgsUtWfN7SYXx9yAG6flE9QO0Ljyo_92moR3hiJ_LOOwHvsTpIjsL7x3no8zGqDu38wG_8yQO6A_9bImbXbL8-K-UeyErn7afcSG1vRvTihnW4QwFN7mLaj6dgsqAKMU9yw32Krelc7MHbjXdZlhV-pgycVucy4_bcnJ5JwCNG9slVAhMep-iEnldj-Icp5dB-HTPS6FLAoXN7lqNDm9BIhPyqc8mEDzThh7CTxdRqKmA3-nc4YBTtHxkOEoIeGpCdb1fKY77LOuhRZZL09uXt2FwDXR6xdrM3cxkLENJLeX0ws2F2udtRpLJ4Q2xqFgYTr9Kbv5CrxaH175DOPmzuCVM_O7tYXajZkXB9a-lF2XeREnK_IdSIQ8_xhUqeB4ySDISvbY9ioxr6I6XMFdDJPPuzBNFTJS-C7OzKmI9COtYN2pRkuRYHrLRybECarTwcSEQaGIHl6oLi5um4i-27JX-KLelMOggW36YpgoiybKkpfKLmy0f2zUgBC_UjtKrIzqv5gHTTTJkw56z6Mkb70yoFHmgTKfO6r_UYzYVP0LCPhMXDkIA4ARUkiQVLCSo3hyZNOPEufCQIxk3HlTVoSwh7_m7r_0YrPptHfgBfAGTP2jorsyLvUc0_8qokPu4QpiLA.2EtUpU4pgz8S6vI0B41m9w',
      },
      accessToken: {
        jwtToken:
          'eyJraWQiOiJvYVpPYXJwZit2VmU3QzRTXC84N0ZsZEE2TURZXC9rbDVzUGxPUkUxQ0JDSFU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3MWU5YjIyMS1mMGZmLTRkZWYtOTQzYy0zODBkNGIyZWYyOTMiLCJldmVudF9pZCI6IjRmMjU4Y2ZmLWRlM2QtNDAyZS1hYjRlLWRhMDU5MTIwN2U0MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NDk3NjA3MDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0FnSTl4QlNyVCIsImV4cCI6MTY0OTc2NDMwNSwiaWF0IjoxNjQ5NzYwNzA1LCJqdGkiOiI0ODZiZmM4Yi03M2Q2LTQ4ZjUtODhjNy1mM2U4NTM5MTVlNjkiLCJjbGllbnRfaWQiOiIyc2Y4YWNjYXRtbnVybG83MnV0aHM3Y2NqZSIsInVzZXJuYW1lIjoiNzFlOWIyMjEtZjBmZi00ZGVmLTk0M2MtMzgwZDRiMmVmMjkzIn0.BSNwJVygvLptxSp3mZQo6P2UBrFot707AvqQCdNI2-cH3gJ3-G4S-M9IqTHXH9wro6JP1Vs56duSiJT8v2mezqUQz4zkHkejcV9e3JqnLvka0iY1MyMGROR6e3rbBV8dqJyQWhR5KbR7NAWlbq56e-s0YzUmGcqGi4KE-1iOr5FXbSBu9PMyXcZizyXAiUgSJ0fycazzIhErwW66i0kWqLnY5yAOFlLFeWD8OEKEWTZMtQlmRyV9IZcbdXTOwKgDfb53PXvoCXvilBZ80j0RfFmvpglK4426G8M80sHlmeU66_MTRfqdHzuij9b1iiQ5mNP8Ev-HLL5xBWh11_z0XA',
        payload: {
          sub: '71e9b221-f0ff-4def-943c-380d4b2ef293',
          event_id: '4f258cff-de3d-402e-ab4e-da0591207e40',
          token_use: 'access',
          scope: 'aws.cognito.signin.user.admin',
          auth_time: 1649760705,
          iss: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_AgI9xBSrT',
          exp: 1649764305,
          iat: 1649760705,
          jti: '486bfc8b-73d6-48f5-88c7-f3e853915e69',
          client_id: '2sf8accatmnurlo72uths7ccje',
          username: '71e9b221-f0ff-4def-943c-380d4b2ef293',
        },
      },
      clockDrift: -1,
    },
    authenticationFlowType: 'USER_SRP_AUTH',
    keyPrefix: 'CognitoIdentityServiceProvider.2sf8accatmnurlo72uths7ccje',
    userDataKey:
      'CognitoIdentityServiceProvider.2sf8accatmnurlo72uths7ccje.71e9b221-f0ff-4def-943c-380d4b2ef293.userData',
    attributes: {
      sub: '71e9b221-f0ff-4def-943c-380d4b2ef293',
      birthdate: '2011-12-13',
      email_verified: true,
      gender: 'Male',
      given_name: 'Manh',
      family_name: 'Tran',
      email: 'manhtran@itrvn.com',
    },
    preferredMFA: 'NOMFA',
  };

  const username = '71e9b221-f0ff-4def-943c-380d4b2ef293';
  const clientId = '2sf8accatmnurlo72uths7ccje';
  const userPoolId = 'us-east-2_AgI9xBSrT';

  const idToken =
    'eyJraWQiOiJYZlJjRzg2dE8rOXZ3WGV3NjhtQW1VTVlUVHpDelNxaEZ4dW1MUGlwb3RJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3MWU5YjIyMS1mMGZmLTRkZWYtOTQzYy0zODBkNGIyZWYyOTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMjAxMS0xMi0xMyIsImdlbmRlciI6Ik1hbGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9BZ0k5eEJTclQiLCJjb2duaXRvOnVzZXJuYW1lIjoiNzFlOWIyMjEtZjBmZi00ZGVmLTk0M2MtMzgwZDRiMmVmMjkzIiwiZ2l2ZW5fbmFtZSI6Ik1hbmgiLCJhdWQiOiIyc2Y4YWNjYXRtbnVybG83MnV0aHM3Y2NqZSIsImV2ZW50X2lkIjoiOThhOThmOGEtNTg3MS00OTlmLTlmYWYtNjViYzFhNDJiZTg3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDgwMzA4NDYsImV4cCI6MTY0ODAzNDQ0NiwiaWF0IjoxNjQ4MDMwODQ2LCJmYW1pbHlfbmFtZSI6IlRyYW4iLCJlbWFpbCI6Im1hbmh0cmFuQGl0cnZuLmNvbSJ9.DGpfVdAAcBjNLi5l7_FGOlnbrl_hj1HSaPV5X3upf_nX9jcYfW-sKks8i-NlMHGYLA6sHMeJnu2IdPbgkKEvwl-iLfkZjzj4MXAOK3g4CnDO3qn8TFEa5svHQLyjvvuQkexCBbftkwT2WDiIxVFE8NdLHw_7g7QhZmzr3FlGgd2q4Rh10j-r94omW4ONlHN0IiWlB0hrx5tY_TXZwN7pBgTBqqF5lZSm1GlMvtPznsAlxYcF8nraHcmkm0N9zn1CX8-RTjzEfHy_NJPT7iYab3DIWDHe36dHoaglRjRIcSfNfT_rdJdpe_mSFTt3PslGsLYVbR4YesjCJOyqVMLoBg';
  const accessToken =
    'eyJraWQiOiJvYVpPYXJwZit2VmU3QzRTXC84N0ZsZEE2TURZXC9rbDVzUGxPUkUxQ0JDSFU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3MWU5YjIyMS1mMGZmLTRkZWYtOTQzYy0zODBkNGIyZWYyOTMiLCJldmVudF9pZCI6Ijk4YTk4ZjhhLTU4NzEtNDk5Zi05ZmFmLTY1YmMxYTQyYmU4NyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NDgwMzA4NDYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0FnSTl4QlNyVCIsImV4cCI6MTY0ODAzNDQ0NiwiaWF0IjoxNjQ4MDMwODQ2LCJqdGkiOiJkNDRlYzM1Ny0yYzYzLTQ4MmMtYjRkNy0yZWIyY2IzMDlhZjYiLCJjbGllbnRfaWQiOiIyc2Y4YWNjYXRtbnVybG83MnV0aHM3Y2NqZSIsInVzZXJuYW1lIjoiNzFlOWIyMjEtZjBmZi00ZGVmLTk0M2MtMzgwZDRiMmVmMjkzIn0.OHb6bFHZW45EsXsGJUoCw52ccT7DkSqNy04-EbTABEy3gn0o-az4hwmqPPDMTDXqyKJ3UNOWXW1a5anqtw5VTdzfX0k1UDt2_dz9rAzyqNxzJ0c_fkVp5TETGZHzoT1clDuX6KIixjrUnO02975PmDYvwbe-duaPnPZvk0t9E3Dt4tqtJ39N3sr2tI3iSc-lAZJFN4G4GaRp2BJsPdKpMA69rKrlMJrRyP3V7Z3XRi3hDnhV8pks6yd9kafV28bTLOM8dy0FASrKo8AS9UPAqDmeOUHmXjGkQof1CO_jV2_8VtNss5piVYnAjSLUEoqrnoSt5z4lNim-_6rYiIroRQ';
  const refreshToken =
    'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.jZoDJuALptCn3jQiZav859FwnDC_e70wt9Y-86QjRpVFbCYerpuspCR7L1_QA_qshb4lBc4M3UAB2yDFcbf85K-cnV8AhVclEhmDyigNHyzYOynVBo-IZzVqe1Ywsq6Pgxd87-1Q0YuuK0LM2U2SrRfUhSzK2dePiTl0EhiQQczHNcd1VQbM2ZxrAZsWMKwhdp0Sxq7ECv3v9ILJfF78HiBYqFzZvXTDH8YSDzlJ0_0Sl2xBe2KsJJ6n6F95mNUB1nqEGnaVtQXKOaLvG_qGBr5z6fCxLNnY-aSPMDXlfDNRWYV1CH-HzxPxFVIx7SC90Wl-WgzJplo4m8vxHNzltQ.95JPBTGAwJpkyHEF.1QwB4GJQJvkta1QVBA2vHbSE6YffYxr5XpcRg0XOqEsq1uKjLoWnNOnukbxG98itqR6kxpdCH1VrhoscEy8WRa9BQSELgSp7_tF5DaTFiQ6lARN04RsN6z3rrCz1mmcgqNKkEDWonxC61VSDh2YVbmfO3jgF_0Kf2tNShr1NQ0syjN0Cf-KOJG4tQrjtumWgf4dFuj4JN4JidbHhrSLVq_dI92UpToP0cVUAPZBB3g2QKFcRvk6kFxmZYV0fsAObTVn9GX2tovfnb4JqUO58_bp4niqD0SxnBtqiSHXasSE22WKbTaJ6pRRVbM3GOjIv9BsIGI1bTPcBhShPWEvpI9Oejpw_XL32SrgYSAVbDt-Cyu3FhHBQ89dvakOH1DW3zpPStXFD62Kr8z4lPvabGlzH6Rc-YlDRfYUHTpQfZ95p2qTc5Q1_JVRLrGGGAkHA7txBT0IhNBxV25mEZfcOmQnBi_QdnDEeI_q7P5Fj-Rl8LvdA-jLNV9onHt5ZWKfIUO9cfoO_IlfaHSSwCc5nbPt9sntXCJ0YBNp0Innq5yzDaT8h2RuGpx3E0NqSRtvXq9rj5vorxtUrYdCtTcbf-mJOx_XO6AGK88FbYVALzqBXK5PJkjyprD8pLVrbTziRaube_d8JmM9GUO10jG0G9KhmTPF0JY6skZ2LY2ic4cLth9VxkvqqyNheWCoZvaeteoZ2BJAmoquCZK-x7ODL49UvTqV4Ja2IdBp9eeprgpT3i1SJJMedJcJ-YPLhQaEBC5lYj0t3fJe2vh9TlttbTOujaqUljeCca-Vf5KPIUonfP1ayEJzgSvrB_I425PLZ_980VOulChhX_EG9t_Ng6BP2yJOnM03-7TVy1SjIZ0Z549jl19Av0ptwUmDlWZmlTvnXfDzReOFa8XFxkfiR0fFBln3UhybCUAropyoWVutBJhukK38wG-2ljxakhAy80XQx-sEznNsyQM_QKsnpb_rn36X2E5KoIYD3k15MaNWfKykTp-qGC58uVlgDHVVUiBra--pjytx_nnfTriesfvcivNSLLza9LzNnlvdNBZHn7NMojEVgWq-O0g0yQ8sq9lb2YdphEefgnHWDP6Kk9YC5sFY7CNuiQYE8jVe3Ut4GZQJ50mQDS1LJyFnReeDNkQhFJw6BnyHSIwsk-wCSPJXhONkjNrf7RU6LOh12svhOhJzGzLjLkCAAQW8iqQodRb7DKcldwVPJ_BcvnBaGjyoQ_U4VPHCp_3xHJf9w-YCaGQyFIV9d2A0-__iF83DJWE3yTvksRwhT0D8ZcqOGXLixdSXrT2NP6NhIf0dsw2FxNfkFVHuyA8997Q.SYou-3lrfnxLw6NUCBS5KA';

  const handleAuthentication = () => {
    console.log('authen');
    // var authenticationData = {
    //   Username: 'kttest0528@gmail.com',
    //   Password: '12345678',
    // };

    // var authenticationDetails = new AuthenticationDetails(authenticationData);
    // const userPool = await Auth.currentUserPoolUser();

    const session = new CognitoUserSession({
      IdToken: new CognitoIdToken({IdToken: idToken}),
      AccessToken: new CognitoAccessToken({AccessToken: accessToken}),
      RefreshToken: new CognitoRefreshToken({RefreshToken: refreshToken}),
    });

    let authUser = Auth.createCognitoUser();
    authUser.setSignInUserSession(session);

    var idTokenExpire = session.getIdToken().getExpiration();

    var currentTimeSeconds = Math.round(+new Date() / 1000);

    if (idTokenExpire < currentTimeSeconds) {
      authUser.refreshSession(session.refreshToken, (err, newSession) => {
        console.log('session', err, session);

        // do whatever you want to do now :)
      });
    }

    // try {
    //   const currentSession = await Auth.currentSession();
    //   const token = currentSession.accessToken.jwtToken;
    //   const rr = currentSession.getRefreshToken();
    //   console.log('The refreshToken: ', rr);
    //   console.warn('mobile login current session!!');
    // } catch (ex) {
    //   console.warn(`mobile login ${ex}`);
    // }

    // user.authenticateUser(authenticationDetails, {
    //   onSuccess: function (result) {
    //     var accessToken = result.getAccessToken().getJwtToken();

    //     /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
    //     var idToken = result.idToken.jwtToken;
    //     console.log('accessToken: ', accessToken);
    //   },

    //   onFailure: function (err) {
    //     alert(err);
    //   },
    // });
    // handleCallAPI();
  };

  const handleCallAPI = async () => {
    try {
      const patientInfo = await getCurrentCCMConsent();
      console.log('dataAPP: ', patientInfo);
    } catch (error) {
      console.log('API error: ', error);
    }
  };

  const getRawData = () => {
    const attributes = data.attributes;
    console.log('family_name: ', attributes.family_name);
    console.log('given_name: ', attributes.given_name);
    console.log('email: ', attributes.email);
    // console.log('data: ', attributes);
  };

  const onFetchDataFromNative = async () => {
    // UserInfoMudle.shareData(userPoolId, accessToken, idToken, refreshToken);
    // UserInfoModule.saveData(userPoolId, accessToken, idToken, refreshToken);
    await UserInfoModule.getProviderData(
      (result, msg, idToken, refreshToken, accessToken) => {
        console.log('result: ', result);
        console.log('msg: ', msg);
        // console.log('data: ', data);
        console.log('idToken: ', idToken);
        console.log('refreshToken: ', refreshToken);
        console.log('accessToken: ', accessToken);
      },
    );
  };

  const onDeleteDataFromNative = async () => {
    console.log('onDelete');
    await UserInfoModule.deleteData((result, error) => {
      console.log('delete result: ', result, error);
    });
  };

  const checkContentProviderStatus = async () => {
    await UserInfoModule.checkFirstTimeCreateContentProvider((isExist, msg) => {
      console.log('isExist: ' + isExist + ', msg: ' + msg);
    });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.btnStyle}>
        <Button title="GET AUTHENTICATION AWS" onPress={handleAuthentication} />
      </View> */}

      {/* <View style={styles.btnStyle}>
        <Button title="CALL API" onPress={handleCallAPI} />
      </View> */}

      <View style={styles.btnStyle}>
        <Button
          title="FETCH DATA FROM NATIVE MODULE"
          onPress={onFetchDataFromNative}
        />
      </View>

      <View style={styles.btnStyle}>
        <Button
          title="DELETE DATA FROM NATIVE MODULE"
          onPress={onDeleteDataFromNative}
        />
      </View>

      <View style={styles.btnStyle}>
        <Button
          title="CHECK IF CONTENT PROVIDER EXIST NATIVE MODULE"
          onPress={checkContentProviderStatus}
        />
      </View>

      <View style={styles.btnStyle}>
        <Button title="GET DATA" onPress={getRawData} />
      </View>
    </View>
  );
};

export default InitView;
