import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      loggedIn
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token) {
      loggedIn
      id
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      token
      loggedIn
    }
  }
`;

export const CONVERT_TOKEN = gql`
  mutation convertToken($token: String!) {
    convertToken(token: $token) {
      id
    }
  }
`;

export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $description: String) {
    newCard(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $title: String!, $description: String!) {
    updateCard(id: $id, title: $title, description: $description) {
      title
      description
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;

export const ADD_LIST_CARD = gql`
  mutation AddListCard($listId: ID!, $cardId: ID!) {
    addListCard(listId: $listId, cardId: $cardId) {
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

export const REMOVE_LIST_CARD = gql`
  mutation RemoveListCard($listId: ID!, $cardId: ID!) {
    removeListCard(listId: $listId, cardId: $cardId) {
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

export const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!) {
    newComment(body: $body) {
      id
      body
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const ADD_BOARD = gql`
  mutation AddBoard($title: String!) {
    newBoard(title: $title) {
      id
      title
      image
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($id: ID) {
    deleteBoard(id: $id) {
      id
      title
      image
    }
  }
`;
export const DELETE_USER_BOARD = gql`
  mutation deleteUserBoard($userId: ID!, $boardId: ID!) {
    deleteUserBoard(userId: $userId, boardId: $boardId) {
      id
      name
      boards {
        id
        title
        image
      }
    }
  }
`;

export const NEW_LIST = gql`
  mutation newList($title: String!) {
    newList(title: $title) {
      id
      title
    }
  }
`;

export const UPDATE_LIST = gql`
  mutation updateList($id: ID!, $title: String!) {
    updateList(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id) {
      id
      title
    }
  }
`;

export const ADD_BOARD_LIST = gql`
  mutation addBoardList($boardId: ID!, $listId: ID!) {
    addBoardList(boardId: $boardId, listId: $listId) {
      id
      title
      lists {
        id
        title
      }
    }
  }
`;

export const REMOVE_BOARD_LIST = gql`
  mutation removeBoardList($boardId: ID!, $listId: ID!) {
    removeBoardList(boardId: $boardId, listId: $listId) {
      id
      title
      lists {
        id
        title
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $boardId: ID) {
    updateUser(id: $id, boardId: $boardId) {
      id
      name
      board {
        id
        title
      }
    }
  }
`;

export const UPDATE_USER_BOARD = gql`
  mutation updateUserBoard($userId: ID!, $boardId: ID!) {
    updateUserBoard(userId: $userId, boardId: $boardId) {
      id
    }
  }
`;

export const ADD_USER_BOARD = gql`
  mutation newUserBoard($userId: ID!, $title: String!, $image: String!) {
    newUserBoard(userId: $userId, title: $title, image: $image) {
      id
      name
      boards {
        id
        title
        image
      }
    }
  }
`;
