import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import Layout from "../components/auth/Layout";
import Form from "../components/auth/Form";
import { userLogout } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useEffect } from "react";

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
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
  const { loading, error, data, refetch } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
    variables: {
      page: 1,
    },
  });

  useEffect(() => {
    refetch();
    console.log("새로 불러옴");
  }, []);

  if (error) return `Error! ${error.message}`;

  return loading ? (
    <div>loading ...</div>
  ) : (
    <Layout>
      <PageTitle title="Home | Nomad-Coffee" />
      <Form>
        {data?.seeCoffeeShops.map((coffeeShop) => (
          <Link
            to={`${routes.shop}/${coffeeShop.id}`}
            key={coffeeShop.id}
            style={{
              border: "1px solid #c8c8c8",
              margin: "20px",
              padding: "10px 100px",
              width: "400px",
            }}
          >
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
          </Link>
        ))}
        <Button onClick={() => userLogout()}>Log out</Button>
        <Link to={routes.add}>Add CoffeeShop</Link>
      </Form>
    </Layout>
  );
};
export default Home;
