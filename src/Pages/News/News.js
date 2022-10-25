import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const News = () => {
    const news = useLoaderData();
    const { title, details, image_url, author, category_id, total_view } = news;
    return (
        <Card>
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Text className='d-flex justify-content-between m-0'>
                    <p><b>Author:</b> {author?.name}</p>
                    <p><b>Publish date:</b> {author?.published_date}</p>
                    <p><b>View:</b> {total_view}</p>
                </Card.Text>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {details}
                </Card.Text>
                <Link to={`/category/${category_id}`}>
                    <Button variant="primary">Go to news category</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default News;