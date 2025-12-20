export default function NewsCard({ data }) {
  return (
    <div className="news-card">
      {/* Image optional */}
      {data.image && <img src={data.image} alt={data.title} />}


      <div className="news-body">
        <h3>{data.title}</h3>
        <p>{data.description}</p>

        <span className="news-date">
          {new Date(data.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
