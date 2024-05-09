import { Create, SimpleForm, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
        <TextInput source="id" validate={[required()]} label="Id" />
      </SimpleForm>
    </Create>
  );
};
