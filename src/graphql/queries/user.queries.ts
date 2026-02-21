import { gql } from "@apollo/client/core";
import {
  USER_BASIC_FIELDS,
  USER_DETAILS_FIELDS,
} from "../fragments/user.fragments";

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

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      ...UserDetailsFields
    }
  }
  ${USER_DETAILS_FIELDS}
`;
