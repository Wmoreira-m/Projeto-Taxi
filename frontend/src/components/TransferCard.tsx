type TransferCardProps = {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
};

export default function TransferCard({ title, description, image, onClick }: TransferCardProps) {
  return (
    <div className="transfer-card">

      {image && (
        <img className="transfer-card-img" src={image} alt={title} />
      )}

      <h4>{title}</h4>
      <p>{description}</p>

      {onClick && (
        <button 
          className="card-agendar-btn"
          onClick={onClick}
        >
          📅 Agendar
        </button>
      )}
    </div>
  );
}
