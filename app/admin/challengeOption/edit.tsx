import {
  BooleanInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
  Edit,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" label="image URL" />
        <TextInput source="audioSrc" label="audio URL" />
      </SimpleForm>
    </Edit>
  );
};
