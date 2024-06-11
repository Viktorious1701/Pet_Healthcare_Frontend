import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #32ddac;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #28b894;
  }
`;

type ModalProps = {
  message: string;
  onRefresh: () => void;
};

const Modal = ({ message, onRefresh }: ModalProps) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <ModalButton onClick={onRefresh}>Refresh Page</ModalButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
