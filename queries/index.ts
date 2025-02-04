import { gql } from "@apollo/client";
export const GET_SONG_DETAILS = gql`
  {
    user(id: "666d2afd006cd9d63d0f466d") {
      id
      firstName
      age
      company {
        name
        description
      }
    }
  }
`;
