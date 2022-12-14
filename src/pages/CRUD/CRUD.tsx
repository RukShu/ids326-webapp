import { FC, ReactNode } from 'react';
import { Tabs } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './CRUD.css';

type CRUDProps = {
  children?: ReactNode;
};

enum CRUDTabMenuOptions {
  Person = '/hw-1/crud/person',
  Company = '/hw-1/crud/company',
  Role = '/hw-1/crud/role',
  ContactType = '/hw-1/crud/contact-type',
  Department = '/hw-1/crud/department',
}

export const CRUD: FC<CRUDProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value: string) => {
    navigate(value);
  };

  return (
    <div className="crud-menu-container">
      <h1 className="crud-menu-title">CRUD</h1>
      <Tabs
        activeKey={location.pathname}
        onChange={handleChange}
        items={[
          { label: 'Person', key: CRUDTabMenuOptions.Person },
          { label: 'Company', key: CRUDTabMenuOptions.Company },
          { label: 'Department', key: CRUDTabMenuOptions.Department },
          { label: 'Role', key: CRUDTabMenuOptions.Role },
          { label: 'Contact Type', key: CRUDTabMenuOptions.ContactType },
        ]}
      />
      {children}
    </div>
  );
};
