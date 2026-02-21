import { gql } from "@apollo/client/core";
import { USER_BASIC_FIELDS } from "../fragments/user.fragments";

export const GET_USERS = gql`
  query GetUsers($page: Int!, $limit: Int!) {
    users(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        ...UserBasicFields
      }
      meta {
        totalCount
      }
    }
  }
  ${USER_BASIC_FIELDS}
`;
