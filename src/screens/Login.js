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

const Login = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <Layout>
      <PageTitle title="Login | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Title title="Welcome To" subTitle="Nomad-Coffee" />
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
            // minLength: {
            //   value: 3,
            //   message: "유저의 이름은 3글자 이상이어야 합니다.",
            // },
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
          })}
          onChange={() => clearErrors("password")}
          placeholder="Password"
        />
        {errors.password?.message}
        <Button>Login</Button>
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
