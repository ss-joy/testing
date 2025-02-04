import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SONG_DETAILS = gql`
  query getUsers {
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

const GqlPractice = () => {
  const { data, loading } = useQuery(GET_SONG_DETAILS);
  console.log(data?.song);
  console.log(loading);

  if (loading) return "loading........";
  return <div>{JSON.stringify(data)}</div>;
};

export default GqlPractice;
