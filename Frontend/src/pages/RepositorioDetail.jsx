import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import PageHero from '../components/PageHero';
import '../styles/RepositorioDetail.css';

export default function RepositorioDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await multimediaService.fetchById(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="repo-detail-empty">
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="repo-detail-empty">
        <h2>Archivo no encontrado</h2>
        <p>{error}</p>
        <Link to="/repositorio" className="repo-detail-back-link">
          Volver
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        badge="📂 Repositorio"
        title={item.title}
        description={`${item.year || ''} · Por ${item.author || 'Desconocido'}`}
      />

      <div className="repo-detail-wrap">
        <Link to="/repositorio" className="repo-detail-back-link repo-detail-back-link--top">
          ← Volver al Repositorio
        </Link>

        <div className="repo-detail-preview">
          {item.url ? (
            item.url.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls src={item.url} style={{ width: '100%', maxHeight: '500px', borderRadius: '16px', marginBottom: '1.5rem', background: '#000' }} />
            ) : item.url.includes('youtube.com/embed/') ? (
              <iframe src={item.url} style={{ width: '100%', height: '400px', borderRadius: '16px', marginBottom: '1.5rem', border: 'none' }} allowFullScreen title={item.title} />
            ) : item.url.includes('youtube.com/watch?v=') || item.url.includes('youtu.be/') ? (
              <iframe src={item.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} style={{ width: '100%', height: '400px', borderRadius: '16px', marginBottom: '1.5rem', border: 'none' }} allowFullScreen title={item.title} />
            ) : (
              <img src={item.url} alt={item.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} />
            )
          ) : (
            <div className="repo-detail-emoji">📂</div>
          )}
          <h3>{item.title}</h3>
          <p className="repo-detail-text">
            {item.description || 'El archivo se encuentra en los registros históricos del repositorio.'}
          </p>
          <p style={{ color: '#999', fontSize: '.9rem', marginTop: '.5rem' }}>
            {item.author && `Por ${item.author}`}
            {item.uploadedAt && ` · ${new Date(item.uploadedAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>
    </>
  );
}