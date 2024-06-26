import create from 'zustand';

const ModalStore = create((set) => ({
  isModalOpen: false,
  isRegisterModalOpen: false,

  setIsModalOpen: (status) => set({ isModalOpen: status }),
  setIsRegisterModalOpen: (status) => set({ isRegisterModalOpen: status }),
}));

export default ModalStore;