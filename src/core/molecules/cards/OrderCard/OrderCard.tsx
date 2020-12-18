import React, { FC } from 'react';
import Price from '../../../atoms/price';
import { ICardProps } from '../interfaces';
import Card from '..';

export interface IOrderDetails {
  price: number;
  priceDescription: string;
  available: string;
  initailRental: string;
  contractLength: string;
  annualMileage: string;
  maintenance: string;
  fuel: string;
  transmission: string;
  color: string;
  trim: string;
  orderNumber?: string;
  orderDate: string;
  orderButton?: React.ReactNode;
}

export interface IOrderDetailsProps extends ICardProps {
  orderDetails: IOrderDetails;
}

const OrderCard: FC<IOrderDetailsProps> = props => {
  const { orderDetails } = props;
  const data = [
    { name: 'available', label: 'Available', value: orderDetails.available },
    {
      name: 'rental',
      label: 'Initial Rental',
      value: orderDetails.initailRental,
    },
    {
      name: 'contractLength',
      label: 'Contract Length',
      value: orderDetails.contractLength,
    },
    {
      name: 'annualMileage',
      label: 'Annual Mileage',
      value: orderDetails.annualMileage,
    },
    {
      name: 'maintenance',
      label: 'Maintanence',
      value: orderDetails.maintenance,
    },
    { name: 'fuel', label: 'Fuel', value: orderDetails.fuel },
    {
      name: 'transmission',
      label: 'Transmission',
      value: orderDetails.transmission,
    },
    { name: 'color', label: 'Color', value: orderDetails.color },
    { name: 'trim', label: 'Trim', value: orderDetails.trim },
  ];

  const renderList = () => {
    return data.map(
      el =>
        !!el.value && (
          <span key={el.name}>
            {el.label} {el.value}
          </span>
        ),
    );
  };

  return (
    <Card {...props}>
      <div className="spec-list">
        {renderList()}
        <hr />
        {orderDetails.orderNumber && (
          <div>
            <span>Order No:&nbsp;</span>
            <span>{orderDetails.orderNumber}</span>
          </div>
        )}
        <div>
          <span>Date:&nbsp;</span>
          <span>{orderDetails.orderDate}</span>
        </div>
      </div>
      <div className="-flex-h">
        <Price
          price={orderDetails.price}
          size="large"
          separator="."
          priceDescription={orderDetails.priceDescription}
        />
        {orderDetails.orderButton}
      </div>
    </Card>
  );
};

export default OrderCard;
