import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommonLoading } from 'react-loadingg';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import app from '../../services/firebase';
import 'firebase/database';

const Activity = (props) => {
  const { data } = props;
  return (
    <div>
      {/* <a href={data.url}> */}
      <h4>
        -
        {data.title}
      </h4>
      {/* </a> */}
      <Card.Text>{data.desc}</Card.Text>
    </div>
  );
};

const NewsPerDate = (props) => {
  const { data } = props;

  return (
    <div>
      <Card className="text-center">
        <Card.Header>{data.date}</Card.Header>
        <Card.Body>
          {data.activity.map((news) => {
            return <Activity key={news.url} data={news} />;
          })}
          <Link to={`/infoCorona/${data.date}`}>
            <Button variant="primary">Baca Berita</Button>
          </Link>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

const CoronaNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = app.database().ref('news');
    db.on('value', (snapshot) => {
      const firebaseNews = snapshot.val();
      setNews(firebaseNews.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="center_view">
      {isLoading ? (
        <CommonLoading />
      ) : (
        news.map((newsData) => {
          return <NewsPerDate key={newsData.date} data={newsData} />;
        })
      )}
    </div>
  );
};

export default CoronaNews;
