import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import { userLogout } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useEffect } from "react";
import styled from "styled-components";

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

const SEE_PROFILE_QUERY = gql`
  query seeProfile($token: String!) {
    seeProfile(token: $token) {
      id
      username
      avatarURL
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Header = styled.header`
  width: 100%;
  min-height: 80px;
  background-color: #282c34;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 130px;
`;

const Title = styled.a`
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
`;

const CoffeeShopContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20%;
  box-sizing: border-box;
  // border: 1px solid #c8c8c8;
`;

const CoffeeShop = styled.div`
  width: 100%;
  height: auto;
  padding: 0 20px;
  // border: 1px solid #c8c8c8;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const CoffeeShopImage = styled.div`
  width: 40%;
  height: 220px;
  border-radius: 10px;
  background-color: #bbb;
  display: flex;
`;

const CoffeeShopInfo = styled.div`
  width: 60%;
  height: 250px;
  // border: 1px solid #c8c8c8;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CoffeeShopAddButton = styled.div`
  width: 50px;
  height: 50px;
  font-size: 36px;
  background-color: #282c34;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 80px;
  cursor: pointer;
  bottom: 80px;
  a {
    color: white;
  }
`;

const Home = () => {
  const { loading, error, data, refetch } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
    variables: {
      page: 1,
    },
  });

  const {
    loading: userLoading,
    error: userError,
    data: user,
  } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      token: localStorage.getItem("token"),
    },
  });
  const dd = user?.seeProfile;

  useEffect(() => {
    refetch();
  }, []);

  if (error) return `Error! ${error.message}`;

  return loading ? (
    <div>loading ...</div>
  ) : (
    <Container>
      <CoffeeShopAddButton>
        <Link to={routes.add}>+</Link>
      </CoffeeShopAddButton>
      <Header>
        <div>
          <Link
            to={routes.home}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <img
              src="https://nomadcoders.co/m.svg"
              alt="logo"
              width="50px"
              height="40px"
            />
            <Title>
              Nomad
              <br /> Coffee
            </Title>
          </Link>
        </div>
        <div>
          <Button
            style={{ backgroundColor: "transparent" }}
            onClick={userLogout}
          >
            Logout
          </Button>
          {/* 아바타 추가되어야 할곳 */}
          {/* <img src={user?.seeProfile?.avatarURL} /> */}
        </div>
      </Header>
      <PageTitle title="Home | Nomad-Coffee" />
      <CoffeeShopContainer>
        {data?.seeCoffeeShops.map((coffeeShop) => (
          <CoffeeShop>
            <CoffeeShopImage />
            <CoffeeShopInfo>
              <div
                style={{
                  color: "black",
                  padding: "25px 40px",
                  // border: "1px solid #c8c8c8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h1 style={{ fontSize: "2rem" }}>{coffeeShop.name}</h1>
                  <h3>{coffeeShop.latitude}</h3>
                  <h3>{coffeeShop.longitude}</h3>
                </div>
                <div>
                  <h6>{coffeeShop.user?.name}</h6>
                </div>
              </div>
              {/* {coffeeShop.photos.map((photo, idx) => (
                  <div key={idx}>
                  <img src={photo.url} alt={photo.url} />
                  </div>
                ))} */}
              <div
                style={{
                  color: "black",
                  padding: "25px 40px",
                  // border: "1px solid #c8c8c8",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  {coffeeShop.categories.map((category, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "50px",
                        border: "2px solid #282c34",
                        borderRadius: "10px",
                        padding: "10px 35px",
                        margin: "10px 0",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        color: "#282c34",
                        fontWeight: "700",
                      }}
                    >
                      {`#${category.name}`}
                    </div>
                  ))}
                </div>
                <Link
                  style={{ color: "#aaa" }}
                  to={`${routes.shop}/${coffeeShop.id}`}
                  key={coffeeShop.id}
                >
                  <div>
                    <h6>더 알아보기</h6>
                  </div>
                </Link>
              </div>
            </CoffeeShopInfo>
          </CoffeeShop>
        ))}
      </CoffeeShopContainer>
    </Container>
  );
};
export default Home;
