import type { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';

export class ReviewController {
  private reviewService: ReviewService;

  constructor(
    reviewService: ReviewService = new ReviewService(),
  ) {
    this.reviewService = reviewService;
  }

  private handleError(
    res: Response,
    error: unknown,
  ): Response {
    if (
      error instanceof Error &&
      error.message === 'REVIEW_NOT_FOUND'
    ) {
      return res.status(404).json({
        status: 'fail',
        message: 'Data review tidak ditemukan',
      });
    }

    if (
      error instanceof Error &&
      error.message === 'INVALID_RATING'
    ) {
      return res.status(400).json({
        status: 'fail',
        message: 'Rating harus berada pada nilai 1 sampai 5',
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }

  getReviews = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const data = await this.reviewService.getAllReviews();

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getReviewById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      const data =
        await this.reviewService.getReviewById(id);

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  createReview = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const { 
        stallId, 
        userId, 
        rating, 
        comment 
        } = req.body;

      if (
        stallId === undefined ||
        userId === undefined ||
        rating === undefined
      ) {
        return res.status(400).json({
          status: 'fail',
          message:
            'stallId, userId, dan rating wajib diisi',
        });
      }

      const data =
        await this.reviewService.createReview({
          stallId: Number(stallId),
          userId: Number(userId),
          rating: Number(rating),
          comment: comment ?? null,
        });

      return res.status(201).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  deleteReview = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      const data =
        await this.reviewService.deleteReview(id);

      return res.status(200).json({
        status: 'success',
        data,
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  };
}