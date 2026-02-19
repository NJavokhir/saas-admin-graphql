import { gql } from "@apollo/client/core";

export const USER_BASIC_FIELDS = gql`
  fragment UserBasicFields on User {
    id
    name
    username
  }
`;