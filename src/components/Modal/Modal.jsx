import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({ isOpen, closeModal, imageUrl }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={isOpen ? styles.Overlay : styles.Hidden}
      onClick={handleOverlayClick}
    >
      <div className={styles.Modal}>
        <img src={imageUrl} alt="Large" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
