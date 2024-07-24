import React from 'react';


export const CreateImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * 잘린 이미지를 File 객체로 반환하는 함수
 * @param {string} imageSrc - 잘라낼 이미지의 소스 URL
 * @param {Object} pixelCrop - 자를 이미지의 좌표 및 크기
 * @param {string} fileName - 결과 파일의 이름
 * @param {string} mimeType - 결과 파일의 MIME 타입
 * @returns {Promise<File>} - 잘린 이미지를 File 객체로 반환하는 Promise
 */  
export const GetCroppedImg = async (imageSrc, pixelCrop, fileName, mimeType) => {
  const image = await CreateImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        const file = new File([blob], fileName, { type: mimeType });
        resolve(file);
      },
      mimeType,
      1
    );
  });
};
