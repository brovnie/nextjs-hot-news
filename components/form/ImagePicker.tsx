'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ImagePicker = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const previewImage = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e || !e.target.files || e.target.files?.length === 0) {
      setAvatar(null);
      return;
    }
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setAvatar(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  const handlePickAvatar = () => {
    imageInputRef.current?.click();
  };

  return (
    <div>
      <label htmlFor="avatar">Choose your avatar</label>
      <div className="w-10 h-10 relative">
        {avatar && <Image src={avatar} alt="avatar" fill />}
      </div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        required
        onChange={previewImage}
        ref={imageInputRef}
      />
      <button type="button" onClick={handlePickAvatar}>
        Choose avatar
      </button>
    </div>
  );
};

export default ImagePicker;
