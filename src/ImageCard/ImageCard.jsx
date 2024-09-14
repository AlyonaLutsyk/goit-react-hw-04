import css from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) {
  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img className={css.image} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
}
