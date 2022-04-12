// import { isLoggedInVar } from "../apollo";
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
import { userLogin } from "../apollo";
import { useLocation } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      userLogin(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = (item) => {
    clearErrors("result");
    clearErrors(item);
  };
  return (
    <Layout>
      <PageTitle title="Login | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Welcome To" subTitle="Nomad-Coffee" />
        {location?.state?.message}
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
          type="text"
          onChange={() => clearLoginError("username")}
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
          onChange={() => clearLoginError("password")}
          placeholder="Password"
        />
        {errors.password?.message}
        <Button type="submit" value={loading ? "Loading..." : "Log in"}>
          Login
        </Button>
        {errors.result?.message}
        <Separator />
        <Bottom
          text="Don't have an account?"
          linkText="Sign up"
          link={routes.signUp}
        />
      </Form>
    </Layout>
  );
};
export default Login;
