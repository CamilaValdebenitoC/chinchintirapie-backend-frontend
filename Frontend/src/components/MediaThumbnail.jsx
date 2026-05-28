import React from 'react';

export default function MediaThumbnail({ url, alt, typeEmoji = '📂' }) {
  if (!url) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--rojo), var(--naranja))', fontSize: '3rem' }}>
        {typeEmoji}
      </div>
    );
  }

  // 1. YouTube Thumbnail
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    return <img src={thumbnailUrl} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }

  // 2. PDF Icon
  if (url.toLowerCase().endsWith('.pdf')) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: '#d32f2f' }}>
        <span style={{ fontSize: '3rem' }}>📄</span>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '0.5rem' }}>PDF</span>
      </div>
    );
  }

  // 3. MP4 / Video File Icon (since playing 50 videos in a list kills performance)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#222', color: '#fff' }}>
        <span style={{ fontSize: '3rem' }}>🎬</span>
        <span style={{ fontSize: '1rem', marginTop: '0.5rem' }}>Video</span>
      </div>
    );
  }

  // 4. Default to standard Image
  return <img src={url} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
}
