import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { getUserProfile } from '@/Services/UserService';
import { UserInfo } from '@/Models/User';

const ContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #fedeea;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  column-gap: 30px;
  position: relative;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background-color: #d99fb5;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 5px solid #fedeea;
`;

const UserInfoTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const InfoRow = styled.tr`
  background-color: #fedeea;
  border-radius: 8px;
`;

const InfoHeader = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  color: #53484c;
  font-weight: bold;
  border-radius: 8px 0 0 8px;
`;

const InfoData = styled.td`
  padding: 0.75rem 1rem;
  color: #53484c;
  border-radius: 0 8px 8px 0;
`;

const UserProfile: React.FC = () => {
  const [userInfo, setUser] = useState<UserInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getUserProfile();
        if (data) {
          setUser(data.data);
          sessionStorage.setItem('userInfo', JSON.stringify(data.data));
        } else {
          const storedUserInfo = sessionStorage.getItem('userInfo');
          if (storedUserInfo) {
            setUser(JSON.parse(storedUserInfo));
          } else {
            setUser(undefined);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
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
      <ContainerLayout>
        <Body>
          <p style={{ color: '#53484c' }}>Loading...</p>
        </Body>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout>
      <Body>
        <Container>
          <ProfileCard>
            <Avatar src='https://via.placeholder.com/150' alt='User Avatar' />
            <UserInfoTable>
              <tbody>
                <InfoRow>
                  <InfoHeader>Name</InfoHeader>
                  <InfoData>
                    {userInfo?.firstName} {userInfo?.lastName}
                  </InfoData>
                </InfoRow>
                <InfoRow>
                  <InfoHeader>Email</InfoHeader>
                  <InfoData>{userInfo?.email}</InfoData>
                </InfoRow>
                <InfoRow>
                  <InfoHeader>Location</InfoHeader>
                  <InfoData>{userInfo?.address}</InfoData>
                </InfoRow>
                <InfoRow>
                  <InfoHeader>Gender</InfoHeader>
                  <InfoData>{userInfo?.gender ? 'Male' : 'Female'}</InfoData>
                </InfoRow>
                <InfoRow>
                  <InfoHeader>Phone Contact</InfoHeader>
                  <InfoData>{userInfo?.phoneNumber || 'N/A'}</InfoData>
                </InfoRow>
              </tbody>
            </UserInfoTable>
          </ProfileCard>
        </Container>
      </Body>
    </ContainerLayout>
  );
};

export default UserProfile;
