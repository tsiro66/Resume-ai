"use client";
import { RiAccountCircleLine } from "react-icons/ri";
import useRegisterModal from "../hooks/useRegisterModal";

const Account = () => {
  const registerModal = useRegisterModal();
  return (
    <div className='fixed top-4 right-4 z-50 cursor-pointer'>
      <RiAccountCircleLine size={30} onClick={registerModal.onOpen} />
    </div>
  );
};

export default Account;
