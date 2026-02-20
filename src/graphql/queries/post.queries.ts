import { gql } from "@apollo/client/core";
import { POST_BASIC_FIELDS } from "../fragments/post.fragments";

export const GET_POSTS = gql`
  query GetPosts($id: ID!) {
    post(id: $id) {
      ...PostBasicFields
    }
  }
  ${POST_BASIC_FIELDS}
`;
