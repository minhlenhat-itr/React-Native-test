import gql from 'graphql-tag';

const SignCCMConsentFragment = gql`
  {
    _id
    patientInfo {
      name
      dateOfBirth
      date
      phone
    }
    signature
    code
    path
  }
`;

export default SignCCMConsentFragment;
