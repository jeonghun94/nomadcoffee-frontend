import Layout from "../components/auth/Layout";
import PageTitle from "../components/PateTitle";
import Button from "../components/auth/Button";
import Title from "../components/auth/Title";
import Input from "../components/auth/Input";
import Form from "../components/auth/Form";
import routes from "../routes";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const EDIT_PROFILE_MUTATION = gql`
  mutation ($avatarURL: Upload, $name: String) {
    editProfile(avatarURL: $avatarURL, name: $name) {
      ok
    }
  }
`;

const EditProfile = () => {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    console.log(ok, error);
    // const { username, password } = getValues();

    // history.push(routes.home, {
    //   username,
    //   password,
    //   message: "Account created",
    // });
  };
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
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

    console.log(data.avatarURL[0], "data");

    editProfile({
      variables: {
        // name: "dsd",
        // avatarURL: data.avatarURL[0],
        ...data,
      },
    });
  };

  return (
    <Layout>
      <PageTitle title="Edit-Profile | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Edit-Profile" subTitle="Nomad-Coffee" />
        <Input
          {...register("avatarURL", {
            required: {
              value: true,
              message: "file is required",
            },
          })}
          type="file"
          placeholder="File"
        />
        {errors.avatarURL?.message}
        <Button type="submit" value={loading ? "Loading..." : "Sign up"}>
          Edit Profile
        </Button>
        {errors.result?.message}
      </Form>
    </Layout>
  );
};
export default EditProfile;
