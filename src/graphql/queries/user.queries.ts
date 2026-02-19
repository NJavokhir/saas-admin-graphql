import { gql } from "@apollo/client/core";
import { USER_BASIC_FIELDS } from "../fragments/user.fragments";

export const GET_SAMPLE_USER = gql`
  query GetSampleUser($id: ID!) {
    user(id: $id) {
      ...UserBasicFields
    }
  }
  ${USER_BASIC_FIELDS}
`;
