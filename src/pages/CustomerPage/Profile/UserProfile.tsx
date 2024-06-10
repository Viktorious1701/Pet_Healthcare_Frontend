import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const UserProfileWrapper = styled.div`
  padding: 1rem;
  background-color: #f4f4f4; /* lightGrey */
  display: flex;
  align-items: start;
  min-height: 100vh;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
   border-radius: 10px;
  background-color: #32ddac;
  min-width: 200px;
  min-height: 200px;
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const UserInfoTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  color: black;
`;

const InfoTableRow = styled(TableRow)`
  border-bottom: 1px solid #b3b3b3; /* gray */
`;

const InfoTableHeader = styled(TableHead)`
  text-align: left;
  padding: 0.5rem;
  font-weight: bold;
  border-bottom: 1px solid #b3b3b3; /* gray */
  color: black;
`;

const InfoTableData = styled(TableCell)`
  padding: 0.5rem;
  border-bottom: 1px solid #b3b3b3; /* gray */
  color: black;
`;

const UserProfile: React.FC = () => {
  return (
    <UserProfileWrapper>
      <ProfileSection>
        <Avatar src="https://via.placeholder.com/100" alt="User Avatar" />
      </ProfileSection>
      <UserInfoTable>
        <TableHeader>
          <InfoTableRow>
            <InfoTableHeader>Name</InfoTableHeader>
            <InfoTableData>John Doe</InfoTableData>
          </InfoTableRow>
        </TableHeader>
        <TableBody>
          <InfoTableRow>
            <InfoTableHeader>Email</InfoTableHeader>
            <InfoTableData>john.doe@example.com</InfoTableData>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableHeader>Location</InfoTableHeader>
            <InfoTableData>New York, USA</InfoTableData>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableHeader>Joined</InfoTableHeader>
            <InfoTableData>January 2021</InfoTableData>
          </InfoTableRow>
        </TableBody>
      </UserInfoTable>
    </UserProfileWrapper>
  );
};

export default UserProfile;
