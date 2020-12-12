import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommonLoading } from 'react-loadingg';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from '../../services/firebase';
import 'firebase/database';

const NewsItem = ({ news }) => {
  const { activity } = news[0];
  return (
    <div>
      {/* <h3>{date}</h3> */}
      {activity.map((data) => {
        return (
          <div key={data.url}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.desc}</Card.Text>
                <a href={data.url}>
                  <Button variant="primary">Baca Selengkapnya</Button>
                </a>
              </Card.Body>
            </Card>
            <br />
          </div>
        );
      })}
    </div>
  );
};

const DetailDate = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { dateId } = params;
  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      const filteredByDate = firebaseNews.data.filter((newsResp) => {
        return newsResp.date === dateId;
      });
      setNews(filteredByDate);
      setIsLoading(false);
    });
  }, [dateId]);

  return (
    <div className="center_view">
      <h2> Info Corona Detail</h2>
      {!isLoading && news.length > 0 ? (
        <NewsItem news={news} />
      ) : (
        <CommonLoading />
      )}
    </div>
  );
};

export default DetailDate;
