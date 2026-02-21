import { gql } from "@apollo/client/core";

export const USER_BASIC_FIELDS = gql`
  fragment UserBasicFields on User {
    id
    name
    username
  }
`;

export const USER_DETAILS_FIELDS = gql`
  fragment UserDetailsFields on User {
    ...UserBasicFields
    email
    phone
    website
  }
  ${USER_BASIC_FIELDS}
`;
