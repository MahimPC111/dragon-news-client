import React from 'react';
import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from "react-icons/fa";

const NewsSummeryCard = ({ news }) => {
    // console.log(news)
    const { _id, title, author, details, image_url, rating, total_view } = news;
    return (
        <div>
            <Card className="mb-5">
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <div className='me-2'>
                            <Image
                                roundedCircle
                                src={author?.img}
                                style={{ width: '60px', height: '60px' }}
                            ></Image>
                        </div>
                        <div>
                            <p className="m-1">{author?.name}</p>
                            <p className="m-1"><small>{author?.published_date}</small></p>
                        </div>
                    </div>
                    <div>
                        <FaRegBookmark className="me-2"></FaRegBookmark>
                        <FaShareAlt></FaShareAlt>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Img variant="top" src={image_url} />
                    <Card.Text>
                        {
                            details.length > 200 ?
                                <>{details.slice(0, 250) + "..."}<Link to={`/news/${_id}`}>see more</Link></>
                                :
                                <>{details}</>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <FaStar className='text-warning me-2'></FaStar>
                        <span>{rating?.number}</span>
                    </div>
                    <div>
                        <FaEye className='me-2'></FaEye>
                        <span>{total_view}</span>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default NewsSummeryCard;