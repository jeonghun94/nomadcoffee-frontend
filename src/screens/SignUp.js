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

const SignUp = () => {
  return (
    <Layout>
      <PageTitle title="Sign-Up | Nomad-Coffee" />
      <Form>
        <Title title="Sign Up" subTitle="Nomad-Coffee" />
        <Input placeholder="Frist Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email" />
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button>Sign Up</Button>
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
