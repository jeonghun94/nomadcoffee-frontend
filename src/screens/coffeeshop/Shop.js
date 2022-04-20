import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/auth/Button";
import Form from "../../components/auth/Form";
import Input from "../../components/auth/Input";
import Layout from "../../components/auth/Layout";
import Title from "../../components/auth/Title";
import PageTitle from "../../components/PateTitle";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      categories {
        name
      }
    }
  }
`;

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $photoUrls: [String]
    $categories: [String]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      photoUrls: $photoUrls
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const Shop = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(SEE_COFFEE_SHOP_QUERY, {
    variables: {
      id: +id,
    },
  });

  const {
    register,
    handleSubmit,
    // clearErrors,
    // setError,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [
    deleteCoffeeShop,
    // { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_COFFEE_SHOP_MUTATION);

  const [editCoffeeShop, { data: editData }] = useMutation(
    EDIT_COFFEE_SHOP_MUTATION
  );
  console.log(editData);
  const editCoffeeShopHandler = () => {
    const variable = getValues();
    editCoffeeShop({
      variables: {
        id: +id,
        ...variable,
      },
    });
    alert("수정되었습니다.");
    history.push(routes.home);
  };

  const onSubmitValid = (data) => {
    console.log(isValid);
    editCoffeeShopHandler();
  };

  const deleteCoffeeShopHandler = () => {
    if (window.confirm("Are you sure you want to delete this coffee shop?")) {
      deleteCoffeeShop({
        variables: {
          id: +id,
        },
      });
      alert("삭제 되었습니다");
      history.push(routes.home);
    } else {
      alert("취소 되었습니다.");
    }
  };

  if (error) return `Error! ${error.message}`;
  return loading ? (
    "loading..."
  ) : (
    <Layout>
      <PageTitle title="See CoffeeShop - Nomad-coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Delete OR Update" subTitle="CoffeeShop" />
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
          value={data?.seeCoffeeShop?.name}
          type="text"
          placeholder="ShopName"
        />
        {errors.name?.message}
        <Input
          {...register("latitude", {
            required: { value: true, message: "latitude is required" },
          })}
          // value={data?.seeCoffeeShop?.latitude}
          type="text"
          placeholder="Latitude"
        />
        {errors.latitude?.message}
        <Input
          {...register("longitude", {
            required: { value: true, message: "longitude is required" },
          })}
          // value={data?.seeCoffeeShop?.longitude}
          type="text"
          placeholder="Longitued"
        />
        {errors.longitude?.message}
        {/* <Input
          {...register("photoUrls", {
            required: {
              value: true,
              message: "photoUrls is required",
            },
          })}
          value={data?.seeCoffeeShop?.photoUrls}
          type="text"
          placeholder="photoUrls"
        /> */}
        {/* {errors.photos?.message}
        <Input
          {...register("categories", {
            required: {
              value: true,
              message: "categories is required",
            },
            readyOnly: {
              value: true,
              message: "categories is required",
            },
          })}
          value={data?.seeCoffeeShop?.categories[0].name}
          type="text"
          placeholder="Categories"
        />
        {errors.categories?.message} */}
        <Button type="submit">Update CoffeeShop</Button>
        <Button
          type="button"
          onClick={deleteCoffeeShopHandler}
          style={{ backgroundColor: "tomato" }}
        >
          Delete CoffeeShop
        </Button>
      </Form>
    </Layout>
  );
};

export default Shop;
