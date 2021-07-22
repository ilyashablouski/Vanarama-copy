export interface IReviewCard {
  summary: string;
  customerName: string;
  rating: number;
}

export interface ReviewsTwoColumnProps {
  reviews: IReviewCard[];
  sliderClassName?: string;
}
