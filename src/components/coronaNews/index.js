import React, { useEffect, useState } from 'react';
import { CommonLoading } from 'react-loadingg';
import { Card, Button } from 'react-bootstrap';
import app from '../../services/firebase';
import 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

let NewsAct = Object;

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

  // console.log(news);

  return (
    <div>
      <h2>data corona</h2>
      {isLoading ? (
        <CommonLoading />
      ) : (
        news.map((data, index) => {
          NewsAct = data.activity;
          return (
            <>
              <Card className="text-center" keys={index}>
                <Card.Header>
                  Berita Corona
                  {/* {data.date} */}
                </Card.Header>
                {NewsAct.map((dataNews, indexNews) => {
                  return (
                    <>
                      <Card.Body keys={indexNews}>
                        <Card.Title>{dataNews.title}</Card.Title>
                        <Card.Text>{dataNews.desc}</Card.Text>
                        <a href={dataNews.url}>
                          <Button variant="primary">
                            Baca berita lengkap ...
                          </Button>
                        </a>
                      </Card.Body>
                    </>
                  );
                })}
                <Card.Footer className="text-muted">
                  Corona Indonesia
                </Card.Footer>
              </Card>
              <br />
            </>
          );
        })
      )}
    </div>
  );
};

export default CoronaNews;
