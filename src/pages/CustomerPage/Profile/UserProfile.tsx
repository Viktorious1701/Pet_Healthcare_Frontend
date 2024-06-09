import React from 'react';
import styled from 'styled-components';

const UserProfileWrapper = styled.div`
  padding: 1rem;
  background-color: #f4f4f4; /* lightGrey */
  border-bottom: 1px solid #b3b3b3; /* gray */
  min-height: 100vh;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const UserInfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #b3b3b3; /* gray */
`;

const TableHeader = styled.th`
  max-width: 150px;
  text-align: left;
  padding: 0.5rem;
  font-weight: bold;
  background-color: #e65b9a; /* pink */
  
`;

const TableData = styled.td`
  padding: 0.5rem;
`;

const UserProfile: React.FC = () => {
  return (
    <UserProfileWrapper>
      <Avatar src="https://via.placeholder.com/100" alt="User Avatar" />
      <UserInfoTable>
        <tbody>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableData>John Doe</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableData>john.doe@example.com</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Location</TableHeader>
            <TableData>New York, USA</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Joined</TableHeader>
            <TableData>January 2021</TableData>
          </TableRow>
        </tbody>
      </UserInfoTable>
    </UserProfileWrapper>
  );
};

export default UserProfile;
