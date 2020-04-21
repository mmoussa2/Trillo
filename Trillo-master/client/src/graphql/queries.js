import gql from "graphql-tag";

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const FETCH_CARDS = gql`
  query FetchCards {
    cards {
      id
      title
      description
    }
  }
`;

export const FETCH_CARD = gql`
  query FetchCard($id: ID!) {
    card(id: $id) {
      id
      title
      description
    }
  }
`;

export const FETCH_COMMENTS = gql`
  query FetchComments {
    comments {
      id
      body
    }
  }
`;

export const FETCH_BOARDS = gql`
  query FetchBoards {
    boards {
      id
      title
      image
    }
  }
`;

export const FETCH_BOARD = gql`
  query FetchBoard($id: ID!) {
    board(id: $id) {
      id
      title
      image
      lists {
        id
        title
      }
    }
  }
`;

export const FETCH_LIST = gql`
  query FetchList($id: ID!) {
    list(id: $id) {
      id
      title
    }
  }
`;

export const GET_USER_BOARDS = gql`
  query userBoards($id: ID!) {
    user(id: $id) {
      boards {
        id
        title
        image
      }
    }
  }
`;

export const GET_BOARD_LISTS = gql`
  query boardLists($boardId: ID!) {
    board(id: $boardID) {
      lists {
        id
        title
      }
    }
  }
`;

export const GET_LIST_CARDS = gql`
  query listCards($listId: ID!) {
    list(id: $listId) {
      id
      title
      cards {
        id
        title
        description
      }
    }
  }
`;

export const GET_BOARD_USERS = gql`
  query boardUsers($boardId: ID!) {
    board(id: $boardId) {
      users {
        id
        name
      }
    }
  }
`;
