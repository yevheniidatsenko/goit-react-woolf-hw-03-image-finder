import React, { Component } from 'react';

import { Searchbar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { getImages } from '../Services/API';
import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    modalOpen: false,
    selectedImage: '',
    query: '',
    showBtn: false,
  };

  handleSearch = query => {
    this.setState({ images: [], page: 1, query });
  };

  searchImages = async () => {
    this.setState({ loading: true });

    try {
      const response = await getImages(this.state.query, this.state.page);

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
        showBtn: this.state.page < Math.ceil(response.totalHits / 12),
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = imageUrl => {
    this.setState({ modalOpen: true, selectedImage: imageUrl });
    document.body.style.overflow = 'hidden';
  };

  closeModal = () => {
    this.setState({ modalOpen: false, selectedImage: '' });
    document.body.style.overflow = '';
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        this.searchImages();
      } catch (error) {}
    }
  }

  render() {
    const { images, loading, modalOpen, selectedImage, showBtn } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loading && <Loader />}
        {showBtn && (
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
