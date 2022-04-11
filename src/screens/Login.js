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

const Login = () => {
  return (
    <Layout>
      <PageTitle title="Login | Nomad-Coffee" />
      <Form>
        <Title title="Welcome To" subTitle="Nomad-Coffee" />
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button onClick={() => isLoggedInVar(true)}>Login</Button>
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
