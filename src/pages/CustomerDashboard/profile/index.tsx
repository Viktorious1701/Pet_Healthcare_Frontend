import styled from 'styled-components';
import { Search } from '@/components/customer_components/search';
import ThemeSwitch from '@/components/vet_components/theme-switch';
import { UserNav } from '@/components/customer_components/user-nav';
import UserProfile from './UserProfile';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #53484c;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const ProfileCard = styled.div`
  background-color: #d390a1;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Profile = () => {
  return (
    <LayoutWrapper>
      <Header>
        <HeaderContent>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </HeaderContent>
      </Header>

      <Main>
        <PageTitle>User Profile</PageTitle>
        <ProfileCard>
          <UserProfile />
        </ProfileCard>
      </Main>
    </LayoutWrapper>
  );
};

export default Profile;
