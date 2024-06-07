import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledAccountSettings = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f58ab0;
  color: white;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e65b9a; /* Pink theme border */
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #b0225d; /* Dark pink theme border on focus */
  }
`;

const AccountSettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
  };

  return (
    <StyledAccountSettings>
      <Content>
        <Table>
          <tbody>
            <TableRow>
              <TableHeader>Field</TableHeader>
              <TableHeader>Value</TableHeader>
            </TableRow>
            <TableRow>
              <TableCell>
                <label htmlFor="currentPassword">Current Password</label>
              </TableCell>
              <TableCell>
                <StyledInput
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <label htmlFor="newPassword">New Password</label>
              </TableCell>
              <TableCell>
                <StyledInput
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
              </TableCell>
              <TableCell>
                <StyledInput
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
        <Button onClick={handlePasswordChange}>Change Password</Button>
      </Content>
    </StyledAccountSettings>
  );
};

export default AccountSettings;
