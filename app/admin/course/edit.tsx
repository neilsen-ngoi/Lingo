import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
        <TextInput source="id" validate={[required()]} label="Id" />
      </SimpleForm>
    </Edit>
  );
};
