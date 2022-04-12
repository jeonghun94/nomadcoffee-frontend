import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import Layout from "../components/auth/Layout";
import Form from "../components/auth/Form";
import { userLogout } from "../apollo";

function Home() {
  return (
    <Layout>
      <PageTitle title="Home | Nomad-Coffee" />
      <Form>
        <h1 style={{ color: "black" }}>Welcome Home!</h1>
        <Button onClick={() => userLogout()}>Log out</Button>
      </Form>
    </Layout>
  );
}
export default Home;
