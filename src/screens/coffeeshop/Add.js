import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "../../components/auth/Button";
import Form from "../../components/auth/Form";
import Input from "../../components/auth/Input";
import Layout from "../../components/auth/Layout";
import Title from "../../components/auth/Title";
import PageTitle from "../../components/PateTitle";
import routes from "../../routes";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeshop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photoUrls: Upload
    $categories: [String]!
  ) {
    createCoffeeshop(
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

const Add = () => {
  const {
    register,
    handleSubmit,
    // clearErrors,
    // setError,
    // getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [createCoffeeshop, { loading, error, data }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION
  );

  console.log(loading, error, data);

  const history = useHistory();
  const onSubmitValid = (data) => {
    const { name, latitude, longitude, photoUrls, categories } = data;
    console.log(name, latitude, longitude, photoUrls, categories);
    createCoffeeshop({
      variables: {
        name,
        latitude,
        longitude,
        photoUrls: photoUrls[0],
        categories,
      },
    });
    alert("New Coffee shop created!");
    history.push(routes.home);
  };

  return (
    <Layout>
      <PageTitle title="Add CoffeeShop - Nomad-coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Create New" subTitle="CoffeeShop" />
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
          type="text"
          placeholder="ShopName"
        />
        {errors.name?.message}
        <Input
          {...register("latitude", {
            required: { value: true, message: "latitude is required" },
          })}
          type="text"
          placeholder="Latitude"
        />
        {errors.latitude?.message}
        <Input
          {...register("longitude", {
            required: { value: true, message: "longitude is required" },
          })}
          type="text"
          placeholder="Longitued"
        />
        {errors.longitude?.message}
        <Input
          {...register("photoUrls", {
            required: {
              value: true,
              message: "photoUrls is required",
            },
          })}
          type="file"
          accept="image/*"
        />
        {errors.photos?.message}
        <Input
          {...register("categories", {
            required: {
              value: true,
              message: "categories is required",
            },
          })}
          type="text"
          placeholder="Categories"
        />
        {errors.categories?.message}
        <Button>Add CoffeeShop</Button>
      </Form>
    </Layout>
  );
};

export default Add;
