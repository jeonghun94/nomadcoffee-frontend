import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import Layout from "../components/auth/Layout";
import Form from "../components/auth/Form";
import { userLogout } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const SEE_COFFEE_SHOPS_QUERY = gql`
  query {
    seeCoffeeShops(page: 1) {
      id
      name
      latitude
      longitude
      user {
        id
        name
        username
      }
      photos {
        url
      }
      categories {
        name
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(SEE_COFFEE_SHOPS_QUERY);
  console.log(data?.seeCoffeeShops.length);
  console.log(data?.seeCoffeeShops);

  if (error) return `Error! ${error.message}`;

  return loading ? (
    <div>loading ...</div>
  ) : (
    <Layout>
      <PageTitle title="Home | Nomad-Coffee" />
      <Form>
        {data?.seeCoffeeShops.map((coffeeShop) => (
          <div key={coffeeShop.id}>
            <h1>{coffeeShop.name}</h1>
            <h3>{coffeeShop.latitude}</h3>
            <h3>{coffeeShop.longitude}</h3>
            <h6>{coffeeShop.user?.name}</h6>

            {coffeeShop.photos.map((photo, idx) => (
              <div key={idx}>
                <img src={photo.url} alt={photo.url} />
              </div>
            ))}

            {coffeeShop.categories.map((category, idx) => (
              <h1 key={idx}>{category.name} </h1>
            ))}
          </div>
        ))}
        <Button onClick={() => userLogout()}>Log out</Button>
      </Form>
    </Layout>
  );
};
export default Home;
