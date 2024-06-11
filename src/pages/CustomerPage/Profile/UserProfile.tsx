import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserProfile } from '@/Services/UserService';
import { UserInfo } from '@/Models/User';
import { useAuth } from '@/Context/useAuth';
import Modal from './Modal'; // Make sure to import the Modal component

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
  const [userInfo, setUser] = useState<UserInfo | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // If user is not defined, set userInfo to undefined and return early
      setUser(undefined);
      return;
    }

    const fetchUserProfile = async () => {
      // Reset state before fetching new data
      setUser(undefined);

      const data = await getUserProfile();
      console.log("data in profile", data?.data);

      if (data?.data?.email === user.email) {
        // Only set userInfo if the emails match
        setUser(data.data);
      } else {
        setUser(undefined); // Clear userInfo if emails do not match
        setShowModal(true); // Show modal if data is missing
      }
    };

    fetchUserProfile();

    return () => {
      setUser(undefined);
    };
  }, [user]); // Include user in the dependency array

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <UserProfileWrapper>
      {showModal && <Modal message="Data is missing. Please refresh the page." onRefresh={handleRefresh} />}
      <ProfileSection>
        <Avatar src="https://via.placeholder.com/100" alt="User Avatar" />
      </ProfileSection>
      <UserInfoTable>
        <TableHeader>
          <InfoTableRow>
            <InfoTableHeader>Name</InfoTableHeader>
            <InfoTableData>{userInfo?.firstName} {userInfo?.lastName}</InfoTableData>
          </InfoTableRow>
        </TableHeader>
        <TableBody>
          <InfoTableRow>
            <InfoTableHeader>Email</InfoTableHeader>
            <InfoTableData>{userInfo?.email}</InfoTableData>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableHeader>Location</InfoTableHeader>
            <InfoTableData>{userInfo?.address}</InfoTableData>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableHeader>Gender</InfoTableHeader>
            <InfoTableData>{userInfo?.gender ? "Male" : "Female"}</InfoTableData>
          </InfoTableRow>
          <InfoTableRow>
            <InfoTableHeader>Phone Contact</InfoTableHeader>
            <InfoTableData>{userInfo?.phoneNumber || "N/A"}</InfoTableData>
          </InfoTableRow>
        </TableBody>
      </UserInfoTable>
    </UserProfileWrapper>
  );
};

export default UserProfile;
