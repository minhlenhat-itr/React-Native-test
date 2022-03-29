import gql from 'graphql-tag';
import SignCCMConsentFragment from './signCCMConsentFragment';

const GET_CURRENT_CCM_CONSENT = gql`
  query countNotificationUnRead($carePlanId: ID) {
    countNotificationUnRead(carePlanId: $carePlanId)
  }
`;
export default GET_CURRENT_CCM_CONSENT;
