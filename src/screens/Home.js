import PageTitle from "../components/PateTitle";
// import Button from "../components/auth/Button";
import { userLogout } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useEffect, useState } from "react";
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
      photos
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
  position: sticky;
  top: 0;
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
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  // border: 1px solid #c8c8c8;
`;

const CoffeeShopImage = styled.img`
  width: 36%;
  height: 235px;
  border-radius: 10px;
  background-color: #bbb;
  display: flex;
  margin-right: 30px;
`;

const CoffeeShopInfo = styled.div`
  width: 60%;
  height: 250px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  // border: 1px solid #c8c8c8;
`;

const CoffeeShopAddButton = styled.div`
  position: absolute;
  bottom: 50px;
  right: 80px;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  background-color: #282c34;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    margin-top: 5px;
    color: white;
  }
`;

const NoCoffeeShop = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #282c34;
  gap: 20px;
  font-size: 1.5rem;
  text-align: center;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 160px;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16p x 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
const DropDown = styled.div`
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
`;

const Menu = styled(Link)`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  & :hover {
    background-color: white;
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
    // error: userError,
    data: userData,
    refetch: userRefetch,
  } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      token: localStorage.getItem("token"),
    },
  });

  const [user, setUser] = useState({});
  useEffect(() => {
    if (!userLoading) {
      setUser(userData.seeProfile);
    }
  }, [userData, userLoading]);

  useEffect(() => {
    userRefetch();
    refetch();
  }, [refetch]);

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
        <DropDown>
          <img
            alt="avatarURL"
            src={user?.avatarURL}
            title={user?.username}
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
          <DropDownContent>
            <Menu to={routes.editProfile}>????????? ??????</Menu>
            <Menu onClick={userLogout}>????????????</Menu>
          </DropDownContent>
        </DropDown>
      </Header>
      <PageTitle title="Home | Nomad-Coffee" />
      <CoffeeShopContainer>
        {data?.seeCoffeeShops.length === 0 ? (
          <NoCoffeeShop>
            <h1>????????? ???????????? ????????????.</h1>
            <h2>?????? ????????? ?????? ?????? ????????????!</h2>
          </NoCoffeeShop>
        ) : null}
        {data?.seeCoffeeShops.map((coffeeShop) => (
          <CoffeeShop>
            <CoffeeShopImage src={coffeeShop.photos} />
            <CoffeeShopInfo>
              <div
                style={{
                  color: "black",
                  padding: "25px 10px",
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
                  <h6>{coffeeShop.photos.url}</h6>
                </div>
                <div
                  style={{
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    alt="avatarURL"
                    src={user?.avatarURL}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                  />
                  <h6
                    style={{
                      color: "#999",
                      fontSize: "1rem",
                    }}
                  >
                    {coffeeShop.user.username}
                  </h6>
                </div>
              </div>
              {/* {coffeeShop.photos.map((photo, idx) => (
                  <div key={idx}>
                  <img src={photo.url} alt={photo.url} />
                  </div>
                ))} */}

              <div
                style={{
                  width: "100%",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  // border: "1px solid red",
                }}
              >
                <div
                  style={{
                    width: "80%",
                    height: "auto",
                    display: "flex",
                    // border: "1px solid #c8c8c8",
                  }}
                >
                  {coffeeShop.categories.map((category, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "auto",
                        border: "2px solid #282c34",
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "10px",
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
                <div
                  style={{
                    width: "20%",
                    height: "auto",
                    textAlign: "right",
                    // border: "1px solid #c8c8c8",
                  }}
                >
                  <Link
                    style={{ color: "#aaa" }}
                    to={`${routes.shop}/${coffeeShop.id}`}
                    key={coffeeShop.id}
                  >
                    <h6>??? ????????????</h6>
                  </Link>
                </div>
              </div>
            </CoffeeShopInfo>
          </CoffeeShop>
        ))}
      </CoffeeShopContainer>
    </Container>
  );
};
export default Home;
