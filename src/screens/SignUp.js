import Bottom from "../components/auth/Bottom";
import Layout from "../components/auth/Layout";
import Separator from "../components/auth/Sperator";
import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import Title from "../components/auth/Title";
import Input from "../components/auth/Input";
import Form from "../components/auth/Form";
import routes from "../routes";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $name: String!
    $location: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      name: $name
      location: $location
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    const { username, password } = getValues();

    history.push(routes.home, {
      username,
      password,
      message: "Account created",
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    console.log(data);
    console.log(loading);
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const clearSignError = (item) => {
    clearErrors("result");
    clearErrors(item);
  };
  return (
    <Layout>
      <PageTitle title="Sign-Up | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Sign Up" subTitle="Nomad-Coffee" />
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "name is required",
            },
          })}
          type="text"
          onChange={() => clearSignError("name")}
          placeholder="Name"
        />
        {errors.name?.message}
        <Input
          {...register("location", {
            required: {
              value: true,
              message: "location is required",
            },
          })}
          type="text"
          onChange={() => clearSignError("location")}
          placeholder="Location"
        />
        {errors.location?.message}
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
          })}
          type="text"
          onChange={() => clearSignError("email")}
          placeholder="Email"
        />
        {errors.email?.message}
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
          type="text"
          onChange={() => clearSignError("username")}
          placeholder="Username"
        />
        {errors.username?.message}
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
          })}
          type="password"
          onChange={() => clearSignError("password")}
          placeholder="Password"
        />
        {errors.password?.message}
        <Button type="submit" value={loading ? "Loading..." : "Sign up"}>
          Sign Up
        </Button>
        {errors.result?.message}
        <Separator />
        <Bottom
          text="Do you have an account?"
          linkText="Login"
          link={routes.home}
        />
      </Form>
    </Layout>
  );
};
export default SignUp;
