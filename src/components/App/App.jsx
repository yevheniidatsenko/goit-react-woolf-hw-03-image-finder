import React, { Component } from 'react';
import axios from 'axios';

import { Searchbar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    modalOpen: false,
    selectedImage: '',
    query: '',
    hasMore: true,
  };

  handleSearch = query => {
    this.setState({ images: [], page: 1, query, hasMore: true });
    this.searchImages(query);
  };

  searchImages = async query => {
    this.setState({ loading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${this.state.page}&key=40911756-f65b6d1dd8fe00ae3d3aa7e29&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        hasMore: response.data.hits.length > 0,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMoreImages = async () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      async () => {
        await this.searchImages(this.state.query);
      }
    );
  };

  openModal = imageUrl => {
    this.setState({ modalOpen: true, selectedImage: imageUrl });
    document.body.style.overflow = 'hidden';
  };

  closeModal = () => {
    this.setState({ modalOpen: false, selectedImage: '' });
    document.body.style.overflow = '';
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  };

  handleKeyUp = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { images, loading, modalOpen, selectedImage, hasMore } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && hasMore && (
          <Button onLoadMore={this.loadMoreImages} hasMore={!loading} />
        )}
        <Modal
          isOpen={modalOpen}
          closeModal={this.closeModal}
          imageUrl={selectedImage}
          onOverlayClick={this.handleOverlayClick}
        />
      </div>
    );
  }
}
