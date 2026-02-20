import { gql } from "@apollo/client/core";

export const POST_BASIC_FIELDS = gql`
  fragment PostBasicFields on Post {
    id
    title
    body
  }
`;
