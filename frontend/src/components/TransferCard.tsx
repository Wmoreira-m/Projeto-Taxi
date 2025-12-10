import React from 'react';

type Props = {
  title: string;
  description: string;
  price?: number | string;
};

export default function TransferCard({ title, description, price }: Props) {
  return (
    <div className="card transfer-card">
      <h4>{title}</h4>
      <p>{description}</p>
      {price !== undefined && <p><strong>Preço: </strong>R$ {price}</p>}
    </div>
  );
}
