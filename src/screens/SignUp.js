import { isLoggedInVar } from "../apollo";
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <Layout>
      <PageTitle title="Sign-Up | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Title title="Sign Up" subTitle="Nomad-Coffee" />
        <Input
          {...register("firstName", {
            required: {
              value: true,
              message: "firstName is required",
            },
            maxLength: {
              value: 3,
              message: "firstName is 3 characters short",
            },
          })}
          onChange={() => clearErrors("firstName")}
          placeholder="Frist Name"
        />
        {errors.firstName?.message}
        <Input
          {...register("lastName", {
            required: {
              value: true,
              message: "lastName is required",
            },
          })}
          onChange={() => clearErrors("lastName")}
          placeholder="Last Name"
        />
        {errors.lastName?.message}
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "email is required",
            },
          })}
          onChange={() => clearErrors("email")}
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
          onChange={() => clearErrors("username")}
          placeholder="Username"
        />
        {errors.username?.message}
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            },
            minLength: {
              value: 6,
              message: "password is 6 characters long",
            },
          })}
          onChange={() => clearErrors("password")}
          placeholder="Password"
        />
        {errors.password?.message}
        <Button onClick={() => isLoggedInVar(true)}>Sign Up</Button>
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
