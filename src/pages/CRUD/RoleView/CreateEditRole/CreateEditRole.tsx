import { Button, Form, Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useRole } from '../../../../hooks/useRole';
import { CreateRoleForm, Role } from '../../../../types/role';

type CreateRoleProps = {
  disabled?: boolean;
  editMode?: boolean;
  selectedRole?: Role;
  refetch: () => Promise<void>;
};

export const CreateEditRole: FC<CreateRoleProps> = ({
  disabled,
  editMode,
  selectedRole,
  refetch,
}) => {
  const [form] = Form.useForm<CreateRoleForm>();
  const { createRole, editRole } = useRole();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleSubmit = async (values: CreateRoleForm) => {
    if (editMode) await editRole({ id: selectedRole!.id, ...values });
    else await createRole(values);
    await refetch();
    setIsModalVisible(false);
  };

  const handleCancel = () => setIsModalVisible(false);

  useEffect(() => {
    if (!isModalVisible) form.resetFields();
    if (isModalVisible && editMode) {
      form.setFieldsValue({ ...selectedRole });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible]);

  return (
    <>
      <Button disabled={disabled} onClick={showModal}>
        {editMode ? 'Edit' : 'Create'}
      </Button>
      <Modal
        title="Create Role"
        visible={isModalVisible}
        onOk={form.submit}
        okText="Submit"
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
