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
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile();
        console.log("data",data);
        if (data) {
          setUser(data.data);
          sessionStorage.setItem('userInfo', JSON.stringify(data.data));
        } else {
          // If data is not available from API, try to retrieve from sessionStorage
          const storedUserInfo = sessionStorage.getItem('userInfo');
          if (storedUserInfo) {
            setUser(JSON.parse(storedUserInfo));
          } else {
            setUser(undefined);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // If error occurs, try to retrieve from sessionStorage
        const storedUserInfo = sessionStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUser(JSON.parse(storedUserInfo));
        } else {
          setUser(undefined);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <UserProfileWrapper>
        <p>Loading...</p>
      </UserProfileWrapper>
    );
  }

  return (
    <UserProfileWrapper>
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
