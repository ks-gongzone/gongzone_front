import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import GZAPI from '../../../utils/api';

// Modal의 App element 설정
Modal.setAppElement('#root');

export default function PictureModal({ isOpen, onRequestClose, onImageSave, profileImage, memberNo }) {
  const [image, setImage] = useState(null);
  const [hasProfileImage, setHasProfileImage] = useState(false);

  useEffect(() => {
    const checkProfileImage = async () => {
      try {
        console.log('프로필 이미지 확인 요청:', memberNo);
        const response = await GZAPI.get(`/api/members/getProfile/${memberNo}`);
        console.log('프로필 이미지 확인 응답:', response.data);
        if (response.data && response.data.file && Object.keys(response.data.file).length > 0) {
          console.log('이미지 존재');
          setHasProfileImage(true);
        } else {
          console.log('이미지 없음');
          setHasProfileImage(false);
        }
      } catch (error) {
        console.error('프로필 이미지 확인 실패:', error);
      }
    };
    checkProfileImage();
  }, [memberNo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      alert('이미지 파일을 선택해주세요.');
    }
  };

  const handleSaveOrUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('file', image);

      let apiEndpoint;
      if (hasProfileImage) {
        apiEndpoint = '/api/members/updateProfilePicture';
        console.log('Update 요청:', formData);
      } else {
        apiEndpoint = '/api/members/addProfilePicture';
        console.log('Save 요청:', formData);
      }

      const response = await GZAPI.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('파일 처리 성공:', response.data);
      onImageSave(response.data.filePath);
      alert('프로필 사진이 성공적으로 처리되었습니다!');
      onRequestClose();
    } catch (error) {
      console.error('프로필 사진 처리 실패:', error);
      alert('프로필 사진 처리에 실패했습니다.');
    }
  };


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '500px', // 모달의 최대 너비를 설정합니다.
      padding: '20px',
      borderRadius: '8px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles} // customStyles를 적용
    >
      <div className="text-lg font-bold mb-4">사진 편집하기</div>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      {image && (
        <div className="relative w-full h-64">
          <img src={URL.createObjectURL(image)} alt="선택된 이미지" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="mt-4 flex justify-between w-full">
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {hasProfileImage ? 'Update' : 'Save'}
        </button>
      </div>
    </Modal>
  );
}
