import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import GZAPI from '../../../utils/api';
import Cropper from 'react-easy-crop';
import { GetCroppedImg } from './CanvasUtils';

// Modal의 App element 설정
Modal.setAppElement('#root');

export default function PictureModal({ isOpen, onRequestClose, onImageSave, profileImage, memberNo }) {
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [parsedFileData, setParsedFileData] = useState(null); // 파싱된 파일 데이터
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hasProfileImage, setHasProfileImage] = useState(false);

  useEffect(() => {
    const checkProfileImage = async () => {
      try {
        const response = await GZAPI.get(`/api/members/getProfile/${memberNo}`);
        if (response.data && response.data.file && Object.keys(response.data.file).length > 0) {
          setHasProfileImage(true);
        } else {
          setHasProfileImage(false);
        }
      } catch (error) {
        console.error('프로필 이미지 확인 실패:', error);
      }
    };
    checkProfileImage();
  }, [memberNo]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 URL 생성 및 파일 정보 저장
      setImage(URL.createObjectURL(file));
      setImageType(file.type);

      // 파일 파싱 작업 호출
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await GZAPI.post('/api/members/parseFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data) {
          // 파싱된 파일 정보 저장
          setParsedFileData(response.data);
        }
      } catch (error) {
        console.error('파일 파싱 실패:', error);
      }
    } else {
      alert('이미지 파일을 선택해주세요.');
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveOrUpdate = async () => {
    try {
      const croppedImage = await GetCroppedImg(image, croppedAreaPixels, parsedFileData.fileNewName, imageType);
      const formData = new FormData();
      formData.append('file', croppedImage);
      formData.append('originalName', parsedFileData.fileOriginalName);
      formData.append('newName', parsedFileData.fileNewName);
      formData.append('filePath', parsedFileData.filePath);
      formData.append('fileSize', parsedFileData.fileSize);

      let apiEndpoint;
      if (hasProfileImage) {
        apiEndpoint = '/api/members/updateProfilePicture';
      } else {
        apiEndpoint = '/api/members/addProfilePicture';
      }

      const response = await GZAPI.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
      maxWidth: '500px',
      padding: '20px',
      borderRadius: '8px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className="text-lg font-bold mb-4">사진 편집하기</div>
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      {image && (
        <div className="relative w-full h-64">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
          />
        </div>
      )}
      <div className="mt-4 flex justify-between w-full">
        <button
          onClick={onRequestClose}
          className="bg-[#f97173] text-white px-4 py-2 rounded-lg"
        >
          취소
        </button>
        <button
          onClick={handleSaveOrUpdate}
          className="bg-[#1d5091] text-white px-4 py-2 rounded-lg"
        >
          {hasProfileImage ? '수정' : '등록'}
        </button>
      </div>
    </Modal>
  );
}
