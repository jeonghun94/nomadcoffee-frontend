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
  mutation editProfile($avatarURL: Upload) {
    editProfile(avatarURL: $avatarURL) {
      ok
      error
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
    alert("수정되었습니다.");
    history.push(routes.home, {
      message: "Profile updated",
    });
  };

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmitValid = (data) => {
    editProfile({
      variables: {
        avatarURL: data.avatarURL[0],
      },
    });
  };

  return (
    <Layout>
      <PageTitle title="Edit-Profile | Nomad-Coffee" />
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <Title title="Edit-Profile(Image)" subTitle="Nomad-Coffee" />
        <Input
          {...register("avatarURL", {
            required: {
              value: true,
              message: "file is required",
            },
          })}
          type="file"
          accept="image/*"
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
