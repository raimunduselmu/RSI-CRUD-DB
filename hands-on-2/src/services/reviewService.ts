import {
  ReviewRepository,
  type CreateReviewInput,
} from '../repositories/reviewRepository';

export class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor(
    reviewRepository: ReviewRepository = new ReviewRepository(),
  ) {
    this.reviewRepository = reviewRepository;
  }

  async getAllReviews() {
    return this.reviewRepository.findAll();
  }

  async getReviewById(id: number) {
    const review = await this.reviewRepository.findById(id);

    if (!review) {
      throw new Error('REVIEW_NOT_FOUND');
    }

    return review;
  }

  async createReview(input: CreateReviewInput) {
    // Validasi rating sesuai aturan database 1–5.
    if (input.rating < 1 || input.rating > 5) {
      throw new Error('INVALID_RATING');
    }

    const review = await this.reviewRepository.create(input);

    if (!review) {
      throw new Error('REVIEW_NOT_FOUND');
    }

    return review;
  }

  async deleteReview(id: number) {
    const review = await this.reviewRepository.remove(id);

    if (!review) {
      throw new Error('REVIEW_NOT_FOUND');
    }

    return review;
  }
}